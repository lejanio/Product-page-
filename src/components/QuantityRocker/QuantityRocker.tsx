import React, { FC, useState } from 'react';
import './QuantityRocker.scss';

type QuantityRockerProps = {
  inputValue: string;
  onChange: (value: string) => void;
}

const QuantityRocker:FC<QuantityRockerProps> = ({ inputValue, onChange }) => {
  const [previousInputValue, setPreviousInputValue] = useState('');

  const handleChange = (value: string) => {
    onChange(value);

    if (Number(value) <= 0) {
      return;
    }

    setPreviousInputValue(value);
  };

  const handleBlur = () => {
    if (Number(inputValue) >= 0) {
      return;
    }

    onChange(previousInputValue);
  };

  return (
    <div className="quantity-rocker">
      <button
        disabled={Number(inputValue) <= 0}
        onClick={() => {
          const newValue = String(Number(inputValue) - 1);
          onChange(newValue);

          setPreviousInputValue(newValue);
        }}
        className="rocker-button"
      >
        −
      </button>
      <input
        type="number"
        className="rocker-input"
        placeholder="0"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        onFocus={(e) => e.target.select()}
      />
      <button
        onClick={() => {
          const newValue = String(Number(inputValue) + 1);
          onChange(newValue);

          setPreviousInputValue(newValue);
        }}
        className="rocker-button"
      >
        +
      </button>
    </div>
  );
};

export default QuantityRocker;
