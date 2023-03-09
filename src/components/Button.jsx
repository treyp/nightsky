import classNames from "classnames";

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={classNames(
        props.className,
        "rounded bg-sky-700 hover:bg-sky-600 text-white px-4 py-2 text-lg"
      )}
    >
      {children}
    </button>
  );
}
