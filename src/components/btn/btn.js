import React from 'react';
import './btn.css';

const Btn = (props) => {
    const { onClick, label, disabled, dense, children, color, className = '', ...rest } = props;
    let content = children ? children : label;
    let title = (children && label) ? label : '';
    let _className = `${dense ? 'Btn-dense' : 'Btn'} ${className}`.trim();
    let style = {
        '--primary': color
    }

    return <button style={color ? style : {}} className={_className} onClick={onClick} disabled={disabled} title={title} {...rest} >{content}</button>
}

export default Btn;