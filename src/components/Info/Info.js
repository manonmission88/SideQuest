import React from 'react';
import './Info.css';

const Info = ({ title, type, value, onChange, options = [] }) => {
    return (
        <div className="info-box">
            <label>{title}</label> {/* Removed colon here */}
            {type === 'select' ? (
                <select value={value} onChange={(e) => onChange(e.target.value)}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
};

export default Info;
