import React from 'react';
import '../../App.css';

const Button = (props) => {
  return (
    <div className="button">
      <img src={props.src} alt={props.src} onClick={props.onClick} title={props.title} />
    </div>
  );
}

export default Button;
