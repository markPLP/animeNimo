import { useState } from 'react';
const FormRange = ({ label, size, name, parentClass, defaultValue }) => {
  const step = 0.01;
  const maxNumber = 9.99;
  const [selectedNumber, setSelectedNumber] = useState(defaultValue);

  return (
    <div className={`form-control ${parentClass}`}>
      <label htmlFor={name} className="label cursor-pointer p-0">
        <span className="label-text capitalize">{label}</span>
        <span>{selectedNumber}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxNumber}
        value={selectedNumber}
        defaultValue={defaultValue}
        onChange={(e) => setSelectedNumber(e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />
    </div>
  );
};
export default FormRange;
