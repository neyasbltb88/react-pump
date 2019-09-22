import React from 'react';
import './btn.css';

const Btn = (props) => {
    const { onClick, label, disabled, dense, children, color } = props;
    let content = children ? children : label;
    let title = (children && label) ? label : '';
    let className = `${dense ? 'Btn-dense' : 'Btn'}`;
    let style = {
        '--primary': color
    }

    return <button style={color ? style : {}} className={className} onClick={onClick} disabled={disabled} title={title}>{content}</button>
}

export default Btn;