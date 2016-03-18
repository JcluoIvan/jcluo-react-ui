import React, { Component } from 'react';
import UI, { RefreshControl } from '../../src';

class RefreshControlPager extends Component {

    onRefresh () {
        this.refs.RefreshControl.refreshing(true);
        setTimeout(() => {
            this.refs.RefreshControl.refreshing(false);
        }, 3000);
    }
    render () {

        let lines = [];
        for(let i = 0; i < 50; i++) {
            lines.push(<p key={i}> Test {i} </p>);
        }

        return (
            <RefreshControl
                ref="RefreshControl"
                onRefresh={this.onRefresh.bind(this)}>
                {lines}
            </RefreshControl>
        );
    }
}

export default RefreshControlPager;