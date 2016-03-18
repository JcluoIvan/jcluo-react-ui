import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router'


import UI, { Input } from '../src';
import Pager from './components'

import './style';


class App extends Component {
    render () {
        return (
            <div className="container">
                <ul className="left-menu">
                    <li> <Link to='refresh-control'>Refresh Control </Link></li>
                    <li> <Link to='input'>Input</Link></li>
                </ul>

                <div className="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}




ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="refresh-control" component={Pager.RefreshControlPager} />
            <Route path="input" component={Pager.InputPage} />
        </Route>
    </Router>
), document.body);
