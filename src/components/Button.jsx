import classNames from "classnames";

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={classNames("btn btn-primary text-base", props.className)}
    >
      {children}
    </button>
  );
}
