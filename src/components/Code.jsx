import classNames from "classnames";

export default function Code({ children, className, ...props }) {
  return (
    <div {...props} className={classNames("mockup-code", className)}>
      <pre className="max-h-[50vh] overflow-auto break-words">
        <code>{children}</code>
      </pre>
    </div>
  );
}
