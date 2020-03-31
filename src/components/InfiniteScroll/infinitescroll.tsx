import * as React from 'react';
import { Spin, Divider } from 'antd';

export interface InfiniteScrollProps {
    /**
     * Does the resource have more entities
     */
    hasMore: boolean;
    pageindex?: number;
    /**
     * Should show loading
     */
    isLoading: boolean;
    marginTop?: boolean;
    /**
     * Callback to load more entities
     */
    onLoadMore: Function;

    /** Children */
    children?: any;

    /**
     * if true will load onLoadMore at first time.
     */
    needFirstRequest?: boolean;

    /** Show no more content */
    enableNoMoreContent?: boolean;
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps & { on?: any; off?: any }, any> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showLoadMore: false
        }
    }
    public static defaultProps = {
        needFirstRequest: true,
        enableNoMoreContent: true,
        marginTop: false
    }


    prev: number;

    private sentinel = null as HTMLDivElement;

    private $pageContentDom = {} as HTMLDivElement | null;

    componentDidMount() {
        this.props.on('onscroll', () => this.checkWindowScroll())
        if (this.props.needFirstRequest) {
            this.props.onLoadMore();
        }
    }

    componentWillUnmount() {
        if (this.$pageContentDom) {
            this.props.off('onscroll', () => this.checkWindowScroll())
        }
    }

    checkWindowScroll() {
        if (this.props.isLoading || !this.sentinel) {
            return;
        }
        if (this.sentinel.getBoundingClientRect() && this.sentinel.getBoundingClientRect().top - window.innerHeight < 100 && this.props.pageindex >= 3) {
            this.setState({ showLoadMore: true })
        }

        if (
            this.sentinel.parentElement.offsetHeight === this.prev &&
            this.props.hasMore &&
            this.sentinel.getBoundingClientRect() &&
            this.sentinel.getBoundingClientRect().top > 0 &&
            this.sentinel.getBoundingClientRect().top - window.innerHeight < 10 && this.props.pageindex < 3
        ) {
            this.props.onLoadMore();
        }

        this.prev = this.sentinel.parentElement.offsetHeight;
    }

    render() {
        const showNoMoreContent: boolean = this.props.enableNoMoreContent
            && !this.props.isLoading
            && !this.props.hasMore;

        return (
            <React.Fragment>
                {this.props.children}
                {!!this.props.children && <div id="sentinel" ref={(i: HTMLDivElement) => this.sentinel = i} />}
                {(this.props.pageindex >= 3 && this.props.hasMore) ?
                    (this.state.showLoadMore ?
                        <div className="ias_trigger">
                            <a href="#" onClick={() => { }}>查看更多</a>
                        </div>
                        :
                        <div className="loading-container">
                            <Spin />
                        </div>)
                    :
                    <div className="loading-container">
                        <Spin />
                    </div>
                }
                {
                    showNoMoreContent &&
                    <Divider>我也是有底线的</Divider>
                }
            </React.Fragment>
        );
    }

}