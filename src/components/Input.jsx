import classNames from "classnames";

export default function Input(props) {
  return (
    <input
      {...props}
      className={classNames(
        props.className,
        "block rounded bg-slate-100 text-slate-900 w-full p-2 mt-1"
      )}
    />
  );
}
