import React from "react";

function FormField({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  options = [],
  children,
  className = "",
  rightIcon,
  onRightIconClick,
  maxWidth = "380px",
  ...rest
}) {
  const baseClass =
    "w-full border text-white mb-3.5 px-3.5 py-3 rounded-md border-[#2f3336] bg-black focus:border-[#1d9bf0] outline-none";

  // ===== SELECT =====
  if (type === "select") {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseClass} ${className}`}
        style={{ maxWidth }}
        {...rest}
      >
        {children ||
          options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
      </select>
    );
  }

  // ===== INPUT =====
  return (
    <div className="relative w-full" style={{ maxWidth }}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseClass} ${rightIcon ? "pr-16" : ""} ${className}`}
        {...rest}
      />

      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3 top-3 text-2xl text-blue-400"
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
}

export default FormField;
