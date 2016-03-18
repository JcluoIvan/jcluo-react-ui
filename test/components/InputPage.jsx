import React, { Component } from 'react';
import UI, { Input } from '../../src';

class InputPage extends Component {

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
            <div>
                <Input 
                    icon="people"
                    label="Type you account"
                    error="error abcd "/>
            </div>
        );
    }
}

export default InputPage;