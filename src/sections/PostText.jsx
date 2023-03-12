const handleLineBreaks = (string) =>
  string
    .split("\n")
    .map((item, index) => (index === 0 ? item : [<br key={index} />, item]));

export default function PostText({ text, entities }) {
  return <div className="">{handleLineBreaks(text)}</div>;
}
