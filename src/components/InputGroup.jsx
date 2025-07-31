import React from 'react';

const InputGroup = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  children,
  placeholder,
}) => {
  const hasError = touched && error;
  const baseClasses =
    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2';
  const errorClasses = 'border-red-500 focus:ring-red-500';
  const successClasses = 'border-gray-300 focus:ring-blue-500';

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${baseClasses} ${
            hasError ? errorClasses : successClasses
          }`}
        >
          {children}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${baseClasses} ${
            hasError ? errorClasses : successClasses
          }`}
        />
      )}
      {hasError && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputGroup;
