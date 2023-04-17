import classNames from "classnames";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  children: ReactNode;
  className?: string;
}

export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <label {...props} className={classNames("label", className)}>
      <span className="label-text">{children}</span>
    </label>
  );
}
