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
  const [input, setInput] = useState('');
  const [count, setCount] = useState(null);

  // Updates count on input change
  useEffect(() => {
    setCount((prev) => input.length);
  }, [input]);

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
          setInput((prev) => event.target.value);
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
