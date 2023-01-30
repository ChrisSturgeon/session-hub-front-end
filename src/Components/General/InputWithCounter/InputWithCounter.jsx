import './InputWithCounter.css';
import { useState } from 'react';
import { useEffect } from 'react';
export default function InputWithCounter({
  id,
  className,
  name,
  minLength,
  maxLength,
  onChange,
  value,
  placeholder,
}) {
  const [count, setCount] = useState(value.length);

  // Updates input vount on value change
  useEffect(() => {
    setCount(value.length);
  }, [value]);

  return (
    <div className="input-with-counter">
      <input
        type="text"
        name={name}
        id={id}
        className={className}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(event) => {
          if (onChange) {
            onChange(event);
          }
        }}
        value={value}
        placeholder={placeholder}
      ></input>
      <div className="count">
        {count} / {maxLength}
      </div>
    </div>
  );
}
