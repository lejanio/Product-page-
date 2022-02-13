import React, { useState } from 'react';
import './QuantityRocker.scss';

const QuantityRocker = () => {
  const [inputValue, setInputValue] = useState('');
  const [previousInputValue, setPreviousInputValue] = useState('');

  const handleChange = (value: string) => {
    setInputValue(value);

    if (+value <= 0) {
      return;
    }

    setPreviousInputValue(value);
  };

  const handleBlur = () => {
    if (+inputValue >= 0) {
      return;
    }

    setInputValue(previousInputValue);
  };

  return (
    <div className="quantity-rocker">
      <button
        disabled={+inputValue <= 0}
        onClick={() => setInputValue(String(+inputValue - 1))}
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
        onClick={() => setInputValue(String(+inputValue + 1))}
        className="rocker-button"
      >
        +
      </button>
    </div>
  );
};

export default QuantityRocker;
