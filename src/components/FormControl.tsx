import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

interface FormControlProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function FormControl(props: FormControlProps) {
  return (
    <div
      {...props}
      className={classNames("form-control mt-2", props.className)}
    />
  );
}
