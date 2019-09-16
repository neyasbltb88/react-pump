import React from 'react';
import './btn.css';

const Btn = (props) => {
    const { onClick, label, disabled } = props;

    return <button className="Btn" onClick={onClick} disabled={disabled} >{label}</button>
}

export default Btn;