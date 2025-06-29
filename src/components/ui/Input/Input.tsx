import React, { forwardRef } from "react";
import styles from "./Input.module.scss";
import { InputProps } from "./meta/types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, onChange, ...rest }, ref) => {
    return (
      <input
        {...rest}
        id={name}
        name={name}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${styles.input} ${className ? className : ""}`}
        ref={ref}
      />
    );
  }
);

export default Input;
