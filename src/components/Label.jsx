import classNames from "classnames";

export default function Label({ children, ...props }) {
  return (
    <label {...props} className={classNames("label", props.className)}>
      <span className="label-text">{children}</span>
    </label>
  );
}
