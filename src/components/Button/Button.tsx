import React, { FC } from 'react';
import './Button.scss';

type ButtonProps = {
  color: 'orange' | 'white';
  icon?: string;
}

const Button:FC<ButtonProps> = ({ color, icon, children }) => (
  <button
    className={`button ${color === 'orange' && 'orange'} ${color === 'white' && 'white'}`}
  >
    {icon && (<img src={icon} alt="Icon" />)}
    {children}
  </button>
);

export default Button;
