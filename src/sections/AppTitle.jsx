import classNames from "classnames";
import { Link } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function AppTitle(props) {
  return (
    <h1 className={classNames("text-2xl", props.className)}>
      <Link
        to="/"
        className="group hover:animate-text bg-[linear-gradient(to_top_left,_var(--tw-gradient-from),_hsl(var(--a)),_var(--tw-gradient-to),_hsl(var(--a)),_var(--tw-gradient-from))] from-primary via-accent to-primary bg-clip-text text-transparent font-bold"
      >
        <SparklesIcon className="h-6 w-6 inline-block fill-primary group-hover:animate-pulse group-hover:drop-shadow-[0_0_4px_hsl(var(--a))]" />{" "}
        Nightsky
      </Link>
    </h1>
  );
}
