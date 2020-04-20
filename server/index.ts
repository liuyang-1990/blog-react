import Next from 'next';
import fastify from 'fastify';
import axios from "axios";
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


const getData = async (code: string, state: string) => {
    return await axios.get(`${process.env.BASE_ADDRESS}account/oauth?code=${code}&state=${state}`);
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
        fastify.get('/oauth/*', async (req, reply) => {
            const { code, state } = req.query;
            const { referer } = req.headers;
            const res = await getData(code, state);
            if (res.data && res.status == 200) {
                reply.redirect(referer || '/');
            } else {
                reply.send(new Error("someting went wrong."));
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