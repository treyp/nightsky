import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  className?: string;
}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={classNames(
        "input input-bordered w-full max-w-xs",
        props.className
      )}
    />
  );
}
