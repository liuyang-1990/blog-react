import Next from 'next';
import fastify from 'fastify';
import { HttpFactory } from '../tools';
// declare module 'fastify' {
//     export interface FastifyInstance<
//         HttpServer = Server,
//         HttpRequest = IncomingMessage,
//         HttpResponse = ServerResponse,
//         > {
//         httpClient: AxiosInstance;
//     }
// }
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const fastifyInstance = fastify({
    ignoreTrailingSlash: true,
    caseSensitive: false,
    pluginTimeout: -1,
});


const getData = async (code: string, state: string, type: string) => {
    return new HttpFactory().create("oauth").send({
        code: code,
        state: state,
        type: type
    });
}

fastifyInstance.register((fastify, opts, next) => {
    const app = Next({ dev });
    const handle = app.getRequestHandler();
    app.prepare().then(() => {
        if (dev) {
            fastify.get('/_next/*', (req, reply) => {
                return handle(req.req, reply.res).then(() => {
                    reply.sent = true
                })
            });
        }
        fastify.get('/oauth/:type', async (req, reply) => {
            const { type } = req.params;
            const { code, state } = req.query;
            const { referer } = req.headers;
            try {
                const res = await getData(code, state, type);
                if (res.data && res.status == 200) {
                    reply.redirect(referer || '/');
                } else {
                    reply.send(new Error("someting went wrong."));
                }

            } catch (err) {
                reply.code(500).send();
            }
        });

        fastify.all('/*', (req, reply) => {
            return handle(req.req, reply.res).then(() => {
                reply.sent = true
            })
        });

        fastify.setNotFoundHandler((request, reply) => {
            return app.render404(request.req, reply.res).then(() => {
                reply.sent = true
            })
        });

        next();
    }).catch(err => next(err));
})

fastifyInstance.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
})