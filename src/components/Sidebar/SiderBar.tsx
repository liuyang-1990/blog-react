import React, { useEffect } from 'react';
import { Card } from 'antd';
import 'intersection-observer';
import "./style.less";

const SiderBar = props => {
    useEffect(() => {
        let fixedBar = document.querySelector(".sidebar .fixed");
        let observer = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) {
                fixedBar.setAttribute("style", "position:fixed;top:84px");
            } else {
                fixedBar.removeAttribute("style");
            }

        });
        // 开始观察
        observer.observe(document.querySelector('.sidebar'));
        return () => observer.disconnect();
    }, []);
    return (
        <aside className="sidebar">
            <div className="fixed">
                <Card className="widget widget_sentence" title="标签云">
                    <ul className="plinks ptags">
                        <li key="1">
                            <a href="/">
                                红包
                        </a>
                        </li>
                        <li key="2">
                            <a href="/">
                                红包
                        </a>
                        </li>
                        <li key="3">
                            <a href="/">
                                红包
                        </a>
                        </li>
                    </ul>
                </Card>
            </div>
            <Card className="widget widget_hot" title="最新评论文章">
                <ul>
                    <li>
                        <a title="字节跳动向中国红十字基金会捐赠2亿 协助肺炎防控" href="http://www.muzhuangnet.com/show/920.html" >
                            <span className="thumbnail">
                                <img className="thumb" data-original="http://www.muzhuangnet.com/upload/202001/25/202001251807112100.jpg"
                                    src="http://www.muzhuangnet.com/upload/202001/25/202001251807112100.jpg"
                                    alt="字节跳动向中国红十字基金会捐赠2亿 协助肺炎防控"
                                    style={{ display: "block" }} />
                            </span>

                            <span className="text">字节跳动向中国红十字基金会捐赠2亿 协助肺炎防控</span>
                        </a>
                    </li>
                </ul>
            </Card>
            <Card className="widget widget_sentence" title="友情链接">
                <a href="http://www.muzhuangnet.com/" title="木桩博客" target="_blank"> 木桩博客</a>
            </Card>
        </aside>
    )

}

export { SiderBar };