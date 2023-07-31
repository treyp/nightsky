const LINE_RETURN_REGEX = /[\r\n]/;

// handles line breaks
export default function mapTextToComponents(text: string) {
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
