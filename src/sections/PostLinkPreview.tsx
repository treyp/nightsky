import { AppBskyEmbedExternal } from "@atproto/api";
import mapTextToComponents from "../utils/mapTextToComponents";

interface PostLinkPreviewProps {
  external: AppBskyEmbedExternal.View["external"];
}

export default function PostLinkPreview({ external }: PostLinkPreviewProps) {
  return (
    <a
      href={external.uri}
      target="_blank"
      className="block border border-accent rounded mt-2 mr-4 text-sm"
    >
      {external.thumb && (
        <img src={external.thumb} className="max-w-full rounded-t" />
      )}
      <div className="p-2 break-words">
        <div>
          <strong>{external.title}</strong>
        </div>
        <div className="text-gray-400">{external.uri}</div>
        <div className="overflow-hidden max-h-[6.25rem]">
          {mapTextToComponents(external.description)}
        </div>
      </div>
    </a>
  );
}
