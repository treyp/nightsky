import classNames from "classnames";

export default function AppTitle(props) {
  return (
    <h1 className={classNames("text-2xl", props.className)}>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="hover:drop-shadow-[0_0_4px_hsl(var(--a))] hover:animate-text bg-[linear-gradient(to_top_left,_var(--tw-gradient-from),_hsl(var(--a)),_var(--tw-gradient-to),_hsl(var(--a)),_var(--tw-gradient-from))] from-primary via-accent to-primary bg-clip-text text-transparent font-bold"
      >
        ✨ Nightsky
      </a>
    </h1>
  );
}
