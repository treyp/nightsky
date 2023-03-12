import { useContext } from "react";
import { AuthContext } from "../App";
import Timestamp from "../components/Timestamp";

export default function PostMeta({ post }) {
  const { state: authState } = useContext(AuthContext);

  const defaultDomain = `.${authState.service.slice(
    authState.service.indexOf("//") + "//".length
  )}`;
  const handle = post.author?.handle || "";
  const handleIsInDefaultDomain = handle.endsWith(defaultDomain);
  const shortHandle = handleIsInDefaultDomain
    ? handle.slice(0, -1 * defaultDomain.length)
    : handle;
  const handleDefaultDomain = handleIsInDefaultDomain ? defaultDomain : "";

  const createdAt = post.record?.createdAt
    ? new Date(post.record?.createdAt)
    : null;

  return (
    <>
      <span className="font-bold">{post.author?.displayName}</span>{" "}
      <span className="text-primary-content">
        @{shortHandle}
        {handleDefaultDomain && (
          <span className="opacity-30">{handleDefaultDomain}</span>
        )}
      </span>{" "}
      {createdAt && (
        <>
          {"· "}
          <Timestamp date={createdAt} onClick={() => console.log(post)} />
        </>
      )}
    </>
  );
}
