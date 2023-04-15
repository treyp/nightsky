import { RichText } from "@atproto/api";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth";

const LINE_RETURN_REGEX = /[\r\n]/;

// handles line breaks
function mapTextToComponents(text) {
  if (!text.match(LINE_RETURN_REGEX)) {
    return text;
  }
  return text
    .split(LINE_RETURN_REGEX)
    .flatMap((segment, segmentIndex, segments) => {
      if (segmentIndex === segments.length - 1) {
        return segment;
      }
      return [segment, <br key={`line-break-${segmentIndex}`} />];
    });
}

function mapSegmentsToComponents(segments) {
  const components = [];
  let segmentIndex = 0;
  for (const segment of segments) {
    if (segment.isMention()) {
      components.push(
        <a
          href="#"
          className="text-primary"
          onClick={(e) => e.preventDefault()}
          key={segmentIndex}
        >
          {mapTextToComponents(segment.text)}
        </a>
      );
    } else if (segment.isLink()) {
      components.push(
        <a
          href={segment.link?.uri}
          className="text-primary"
          target="_blank"
          itemRef="nofollow"
          key={segmentIndex}
        >
          {mapTextToComponents(segment.text)}
        </a>
      );
    } else {
      components.push(
        <span key={segmentIndex}>{mapTextToComponents(segment.text)}</span>
      );
    }
    segmentIndex++;
  }
  return components;
}

export default function PostText({ text, isFeatured }) {
  const { state: authState } = useAuth();
  const [formattedText, setFormattedText] = useState(text);

  useEffect(() => {
    const richText = new RichText({ text });
    if (!authState.agent) {
      return;
    }
    richText.detectFacets(authState.agent).then(() => {
      setFormattedText(mapSegmentsToComponents(richText.segments()));
    });
  }, [authState.agent, text]);

  return <div className={isFeatured && "text-xl"}>{formattedText}</div>;
}
