import React, { Component, PropTypes } from 'react';

import './style';

class Input extends Component {
    static propTypes = {
        /* input[type] */
        // type: PropTypes.string,

        /* Left Icon */
        icon: PropTypes.string,

        /* Input placeholder */
        label: PropTypes.string,

        /* Input validate */
        error: PropTypes.string,

        /* Input value */
        // value: PropTypes.any,

        /* Input onChange */
        onChange: PropTypes.func
    }

    getNewState({
        icon, 
        label,
        error,
        ...attrs
    }) {

        attrs.className = 'input-text ' + (attrs.className || '');
        attrs.type = attrs.type || 'text';
        return {icon, label, error, attrs};
    }

    constructor (props) {
        super(props);
        this.state = Object.assign({}, this.getNewState(props), {isFocus: false});
    }

    componentWillReceiveProps(props) {
        this.setState(this.getNewState(props));
    }

    onChange(e) {
        (this.props.onChange) &&
            (this.props.onChange(e));
        e && e.stopPropagation();
    }

    renderIcon() {
        var { icon } = this.state;
        return icon ? (
            <div className="Input-Icon material-icons">{icon}</div>
        ) : null;
    }

    renderLabel() {
        var { label } = this.state;
        return label ? (
            <div className="input-label">{label}</div>
        ) : null;

    }


    render () {
        var { error, attrs, isFocus, label } = this.state;
        var _attrs = Object.assign({}, attrs);

        var uiClass = 'JUI-Input';

        if (_attrs.value) {
            uiClass += ' has-input';
        }

        if (isFocus) {
            uiClass += ' is-focus';
        }

        if (error) {
            uiClass += ' has-error';
        }

        return (
            <div className={uiClass}>
                {this.renderIcon()}
                <div className="JUI-Right-Panel" >
                    <div className="Input-Label">{label}</div>
                    <div className="Input-Panel">
                        <input 
                            {..._attrs}
                            onChange={this.onChange.bind(this)} 
                            onFocus={() => this.setState({isFocus: true})} 
                            onBlur={() => this.setState({isFocus: false})} />
                    </div>
                    <div className="Input-Error">{error}</div>
                </div>
            </div>
        );
    }
}
Input.propTypes = {
    
};


export default Input;