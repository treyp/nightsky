import { Link } from "react-router-dom";
import { useAuth } from "../Auth";
import Timestamp from "../components/Timestamp";

export default function PostMeta({ post }) {
  const { state: authState } = useAuth();

  const defaultDomain = `.${authState.service.slice(
    authState.service.indexOf("//") + "//".length
  )}`;
  const handle = post.author?.handle || "";
  const handleIsInDefaultDomain = handle.endsWith(defaultDomain);
  const shortHandle = handleIsInDefaultDomain
    ? handle.slice(0, -1 * defaultDomain.length)
    : handle;
  const handleDefaultDomain = handleIsInDefaultDomain ? defaultDomain : "";
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
        <span className="text-gray-400">
          {shortHandle}
          {handleDefaultDomain && (
            <span className="text-gray-700">{handleDefaultDomain}</span>
          )}
        </span>
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
