/*
    Name: Button.tsx
    Description: Button component
*/

import React from 'react';

// Button type/schema
interface ButtonProps {
    color?: string;
    bgColor?: string;
    text: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  color = "#fff",
  bgColor = "#007bff",
  text,
  onClick,
  style = {},
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: bgColor,
                color: color,
                border: 'none',
                borderRadius: '4px',
                padding: '6px 8px',
                fontSize: '14px',
                height: '36px',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                ...style,
            }}
        >
            {text}
        </button>
    );
};

export default Button;
