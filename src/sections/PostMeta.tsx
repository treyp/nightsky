import { Link } from "react-router-dom";
import Timestamp from "../components/Timestamp";
import Handle from "./Handle";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Record } from "@atproto/api/dist/client/types/app/bsky/feed/post";
import { ViewRecord } from "@atproto/api/dist/client/types/app/bsky/embed/record";

interface PostMetaProps {
  post: PostView | ViewRecord;
}

export default function PostMeta({ post }: PostMetaProps) {
  const handle = post.author?.handle || "";
  const recordId = post.uri.split("/").at(-1);
  const postRecord = post.record as Record | undefined;
  const createdAt = postRecord?.createdAt
    ? new Date(postRecord?.createdAt)
    : null;

  return (
    <>
      <Link to={`/profile/${handle}`}>
        <span className="font-bold">{post.author?.displayName}</span>
      </Link>{" "}
      <Link to={`/profile/${handle}`}>
        <Handle handle={handle} />
      </Link>{" "}
      {createdAt && (
        <>
          <span className="text-gray-400">{" · "}</span>
          <Link to={`/profile/${handle}/post/${recordId}`}>
            <Timestamp className="text-gray-400" date={createdAt} />
          </Link>
        </>
      )}
    </>
  );
}
