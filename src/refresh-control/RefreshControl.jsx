import React, { Component, PropTypes } from 'react';
import RAF from 'jcluo-react-raf';
/* plugin */
// import { RAF } from '../../plugins';

import './style';

function DragControl (component) {
    return class extends component {
        constructor (props) {
            super(props);
            this.cache = {
                onTop: true,
                refresh: false,
                drag: false,
                finish: true,
                startY: 0,
                ready: 0,
                percent: 0,
            }
        }

        onTouchStart(e) {
            if (this.onTop) {
                this.ready = true;
                this.startY = e.touches[0].clientY;
            }

        }

        onTouchMove(e) {
            var distance = e.touches[0].clientY - this.startY;
            if (! this.ready || this.refresh) return false;
            if (! this.drag && distance < 0) return;
            this.drag = true;
            this.percent = Math.min(distance, this.maxValue) / 100;

            if (! this.finish) return;
            this.RAF(time => {
                if (! this.drag) {
                    this.percent = Math.max((this.percent * .9 - 0.01), 0);
                }
                this.updateDragState && this.updateDragState();

                var no_finish = (this.drag || this.percent > 0);

                var state_update = false;
                if  (no_finish === this.finish) {
                    state_update = true;
                    this.finish = ! no_finish;
                }
                if (state_update) {
                    this.forceUpdate();
                }

                return no_finish;

            });


        }

        onTouchEnd(e) {

            if (this.refresh) return;
            this.drag = false;
            this.ready = false;
            this.startY = 0;
            if (this.onRefreshRange && this.state.onRefresh) {
                // this.refresh = true;
                this.state.onRefresh();
                // this.forceUpdate();
                // console.log('refresh');
                // setTimeout(() => {
                //     this.refresh = false;
                //     this.finish = true;
                //     this.forceUpdate();
                // }, 3000);

            }
        }

        onScrollChange (e) {

            var { scrollTop } = e.target;
            this.onTop = (scrollTop === 0);

        }

        get actionRange() {
            return 0.1;
        }
        get maxValue () {
            return 100;
        }
        get startY () {
            return this.cache.startY;
        }
        get ready () {
            return this.cache.ready;
        }
        get finish() {
            return this.cache.finish === true;
        }
        get drag () {
            return this.cache.drag === true;
        }
        get refresh() {
            return this.cache.refresh === true;
        }
        get percent () {
            return this.cache.percent;
        }
        get onRefreshRange() {
            return this.percent + this.actionRange > 1;
        }
        get onTop () {
            return this.cache.onTop === true;
        }

        set startY (y) {
            this.cache.startY = Number(y);
        }
        set ready(bool) {
            this.cache.ready = bool === true;
        }
        set percent (y) {
            this.cache.percent = Number(y);
        }
        set refresh(bool) {
            this.cache.refresh = bool === true;
        }
        set drag (bool) {
            this.cache.drag = bool === true;
        }
        set finish (bool) {
            this.cache.finish = bool === true;
        }
        set onTop (bool) {
            this.cache.onTop = bool === true;
        }
    }
}



@RAF
@DragControl
class RefreshControl extends React.Component {
    static propTypes = {
        onRefresh: PropTypes.func,
    }
    getNewState({ 
        onRefresh,
        ...attrs
    }) {
        attrs.className = 'JUI-RefreshControl ' + (attrs.className || '');

        return {
            onRefresh,
            attrs,
        }

    }


    constructor (props) {
        super (props);

        this.state = this.getNewState(props);

    }

    componentWillReceiveProps(props) {
        this.setState(this.getNewState(props));
    }

    refreshing(bool) {
        this.refresh = bool;
        this.forceUpdate();
    }

    updateDragState () {

        if (this.refresh) {
            this.refs.JUIRefreshTag.style.transform = null;
            this.refs.JUIRefreshIcon.style.transform = null;

        } else {
            var px_height = `${this.percent}px`;
            this.refs.JUIRefreshTag.style.transform = 
                ` translateY(-${100 - this.percent * 100}%)` +
                ` scale(${0.5 * this.percent})`;
            this.refs.JUIRefreshIcon.style.transform = 
                ` rotate(${360 * this.percent}deg)`;
        }

    }

    render () {

        var { attrs} = this.state;

        var tagClass = 'JUI-Refresh-Tag';
        // tagClass += (this.refresh ? ' on-refresh' : '');

        var _attrs = Object.assign({}, attrs);
        _attrs.className += (! this.finish ? ' drag-action' : '');
        _attrs.className += (this.refresh ? ' on-refresh' : '');

        return (
            <div {..._attrs}
                onScroll={this.onScrollChange.bind(this)}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchMove={this.onTouchMove.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}>
                <div ref="JUIRefreshTag" 
                    className={tagClass}>
                    <div className="flex-site"/>
                    <div className="flex-center">
                        <div ref="JUIRefreshIcon" className="icon material-icons">refresh</div>
                        <svg className="circular">
                            <circle ref="loadingCircle" 
                                className="path color" 
                                cx="40" 
                                cy="40" 
                                r="20" 
                                fill="none" 
                                strokeWidth="6" />
                        </svg>
                    </div>
                    <div className="flex-site"/>
                </div>
                <div ref="RCChildren" 
                    className="JUI-children">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default RefreshControl;

