import classNames from "classnames";

export default function Input(props) {
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
