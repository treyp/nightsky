import classNames from "classnames";

export default function FormControl(props) {
  return (
    <div
      {...props}
      className={classNames("form-control mt-2", props.className)}
    />
  );
}
