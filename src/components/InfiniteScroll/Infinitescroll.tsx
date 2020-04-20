import React, { FC, useEffect } from 'react';
import { Spin } from 'antd';
import './style.less';
import { isRegExp } from 'util';

type Props = {
    initialLoad?: boolean;
    pageIndex: number;
    loadMore: (e?: any) => void;
    loading: boolean;
    hasMore: boolean;
    triggerPageThreshold?: number;
    enableNoMoreContent?: boolean;
}


const InfiniteScroll: FC<Props> = ({
    initialLoad = false,
    pageIndex = 1,
    loadMore,
    hasMore,
    triggerPageThreshold = 3,
    loading = false,
    enableNoMoreContent = true,
    children,
}) => {
    useEffect(() => {
        if (initialLoad) {
            loadMore();
        }
        let intersectionObserver = new IntersectionObserver(
            function (entries) {
                // 如果不可见，就返回
                if (entries[0].intersectionRatio <= 0) return;
                if (loading) return;
                if (!hasMore) return;
                if (pageIndex >= triggerPageThreshold) {
                    intersectionObserver.unobserve(document.querySelector('#sentinel'));
                    return;
                }
                loadMore();
            });
        // 开始观察
        intersectionObserver.observe(
            document.querySelector('#sentinel')
        );
        return () => intersectionObserver.disconnect();
    });
    const showNoMoreContent = !hasMore && !loading && enableNoMoreContent;
    return (
        <>
            {children}
            {!!children && <div id="sentinel"></div>}
            {
                pageIndex >= triggerPageThreshold && !loading && hasMore &&
                <div className="ias_trigger">
                    <a onClick={loadMore}>查看更多</a>
                </div>
            }
            {
                loading && hasMore && <div className="loading-container">
                    <Spin />
                </div>
            }
            {
                showNoMoreContent &&
                <div className="no-more-container">
                    我也是有底线的
                </div>
            }
        </>)
}

export { InfiniteScroll };
