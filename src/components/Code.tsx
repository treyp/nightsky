import classNames from "classnames";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface CodeProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export default function Code({ children, className, ...props }: CodeProps) {
  return (
    <div {...props} className={classNames("mockup-code", className)}>
      <pre className="max-h-[50vh] overflow-auto break-words">
        <code>{children}</code>
      </pre>
    </div>
  );
}
