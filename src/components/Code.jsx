import classNames from "classnames";

export default function Code(props) {
  return (
    <code
      {...props}
      className={classNames(
        props.className,
        "block p-4 rounded bg-slate-800 font-mono max-w-full break-words"
      )}
    />
  );
}
