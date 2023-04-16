import { Link } from "react-router-dom";
import Timestamp from "../components/Timestamp";
import Handle from "./Handle";

export default function PostMeta({ post }) {
  const handle = post.author?.handle || "";
  const recordId = post.uri.split("/").at(-1);
  const createdAt = post.record?.createdAt
    ? new Date(post.record?.createdAt)
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
