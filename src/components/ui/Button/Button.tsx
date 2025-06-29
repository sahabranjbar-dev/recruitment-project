import React from "react";
import styles from "./Button.module.scss";
import Spinner from "@/components/Loading/Loading";
import { ButtonProps } from "./meta/types";
import { cn } from "@/utils/classNames";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const classes = cn(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    isDisabled && styles["button--disabled"],
    className
  );

  return (
    <button
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon && (
            <span className={styles["button__icon--left"]}>{leftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className={styles["button__icon--right"]}>{rightIcon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
