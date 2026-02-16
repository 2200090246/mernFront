import React from "react";

const Logo = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={className}
            width="50"
            height="50"
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4facfe" />
                    <stop offset="100%" stopColor="#00f2fe" />
                </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="url(#logoGradient)" opacity="0.1" />
            <path
                d="M100 20 L180 160 L20 160 Z"
                fill="none"
                stroke="url(#logoGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="100" cy="90" r="20" fill="#ffffff" />
            <path
                d="M100 120 L100 160"
                stroke="#ffffff"
                strokeWidth="8"
                strokeLinecap="round"
            />
            <path
                d="M70 140 L130 140"
                stroke="#ffffff"
                strokeWidth="8"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Logo;
