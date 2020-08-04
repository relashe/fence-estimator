import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type = "text", value = "", id = "", name = "", placeholder = "", className, ...rest } = props;

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className={className}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
