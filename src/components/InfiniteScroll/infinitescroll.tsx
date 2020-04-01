import React, { Component, FC, useState, useEffect, useRef } from 'react';
import { Spin, Divider } from 'antd';
require('intersection-observer');


type Props = {
    initialLoad?: boolean;
    pageIndex: number;
    loadMore: (e?: any) => void;
    hasMore: boolean;
    triggerPageThreshold?: number;
    loader?: Component;
    endMessage?: Component;
}


const InfiniteScroll: FC<Props> = ({
    initialLoad = true,
    pageIndex,
    loadMore,
    hasMore,
    triggerPageThreshold,
    loader,
    endMessage,
    children,
}) => {
    const [showLoadMore, setShowLoadMore] = useState(false);
    let sentinel = useRef(null);
    let prev: number;
    const checkWindowScroll = () => {
        if (!sentinel) {
            return;
        }
        if (sentinel.current.getBoundingClientRect()
            && sentinel.current.getBoundingClientRect().top - window.innerHeight < 100
            && pageIndex >= triggerPageThreshold) {
            setShowLoadMore(true);
        }
        if (
            sentinel.current.parentElement.offsetHeight === prev &&
            hasMore &&
            sentinel.current.getBoundingClientRect() &&
            sentinel.current.getBoundingClientRect().top > 0 &&
            sentinel.current.getBoundingClientRect().top - window.innerHeight < 10
            && pageIndex < triggerPageThreshold
        ) {
            loadMore(null);
        }
        prev = sentinel.current.parentElement.offsetHeight;
    }

    useEffect(() => {

        let intersectionObserver = new IntersectionObserver(
            function (entries) {
                // 如果不可见，就返回
                if (entries[0].intersectionRatio <= 0) return;
                //loadItems(10);
                loadMore();
                console.log('Loaded new items');
            }, {
            rootMargin: '0px 0px 100px 0px',//设置父容器的检测范围，四个数顺序为上右下左
            threshold: [0, 0.25, 0.5, 1],//设置特定的触发点
        });

        // 开始观察
        intersectionObserver.observe(
            document.querySelector('footer')
        );
        return () => intersectionObserver.disconnect();
    });
    const showNoMoreContent = !hasMore && endMessage;
    return (
        <>
            {children}
            {!!children && <div id="sentinel" ref={sentinel}></div>}
            {
                (pageIndex >= triggerPageThreshold
                    && hasMore) ?
                    (showLoadMore ?
                        <div className="ias_trigger">
                            <a href="#" onClick={loadMore}>查看更多</a>
                        </div>
                        : <div className="loading-container">
                            <Spin />
                        </div>) :
                    <div className="loading-container">
                        <Spin />
                    </div>
            }
            {
                showNoMoreContent &&
                <Divider>我也是有底线的</Divider>
            }
        </>)
}

export { InfiniteScroll };



// export class InfiniteScroll extends React.Component<InfiniteScrollProps & { on?: any; off?: any }, any> {
//     constructor(props, context) {
//         super(props, context);
//         this.state = {
//             showLoadMore: false
//         }
//     }
//     public static defaultProps = {
//         needFirstRequest: true,
//         enableNoMoreContent: true,
//         marginTop: false
//     }


//     prev: number;

//     private sentinel = null as HTMLDivElement;

//     private $pageContentDom = {} as HTMLDivElement | null;

//     componentDidMount() {
//         this.props.on('onscroll', () => this.checkWindowScroll())
//         if (this.props.needFirstRequest) {
//             this.props.onLoadMore();
//         }
//     }

//     componentWillUnmount() {
//         if (this.$pageContentDom) {
//             this.props.off('onscroll', () => this.checkWindowScroll())
//         }
//     }

//     checkWindowScroll() {
//         if (this.props.isLoading || !this.sentinel) {
//             return;
//         }
//         if (this.sentinel.getBoundingClientRect() && this.sentinel.getBoundingClientRect().top - window.innerHeight < 100 && this.props.pageindex >= 3) {
//             this.setState({ showLoadMore: true })
//         }

//         if (
//             this.sentinel.parentElement.offsetHeight === this.prev &&
//             this.props.hasMore &&
//             this.sentinel.getBoundingClientRect() &&
//             this.sentinel.getBoundingClientRect().top > 0 &&
//             this.sentinel.getBoundingClientRect().top - window.innerHeight < 10 && this.props.pageindex < 3
//         ) {
//             this.props.onLoadMore();
//         }

//         this.prev = this.sentinel.parentElement.offsetHeight;
//     }

//     render() {
//         const showNoMoreContent: boolean = this.props.enableNoMoreContent
//             && !this.props.isLoading
//             && !this.props.hasMore;

//         return (
//             <React.Fragment>
//                 {this.props.children}
//                 {!!this.props.children && <div id="sentinel" ref={(i: HTMLDivElement) => this.sentinel = i} />}
//                 {(this.props.pageindex >= 3 && this.props.hasMore) ?
//                     (this.state.showLoadMore ?
//                         <div className="ias_trigger">
//                             <a href="#" onClick={() => this.props.onLoadMore()}>查看更多</a>
//                         </div>
//                         :
//                         <div className="loading-container">
//                             <Spin />
//                         </div>)
//                     :
//                     <div className="loading-container">
//                         <Spin />
//                     </div>
//                 }
//                 {
//                     showNoMoreContent &&
//                     <Divider>我也是有底线的</Divider>
//                 }
//             </React.Fragment>
//         );
//     }

// }