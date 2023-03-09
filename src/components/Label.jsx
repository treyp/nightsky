import classNames from "classnames";

export default function Label(props) {
  return (
    <label {...props} className={classNames(props.className, "block mt-4")} />
  );
}
