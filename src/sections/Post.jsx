import { useContext } from "react";
import { AuthContext } from "../App";
import PostImages from "./PostImages";
import PostText from "./PostText";

export default function Post({ post, isParent, isReply }) {
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
  return (
    <div className="flex pb-2">
      <div className="flex-none pr-2">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={post.author.avatar} />
          </div>
        </div>
        {isParent && (
          <div className="bg-accent w-[2px] mx-auto flex-1 h-auto min-h-6"></div>
        )}
      </div>
      <div className="flex-1">
        <span className="font-bold">{post.author?.displayName}</span>{" "}
        <span className="text-primary-content">
          @{shortHandle}
          {handleDefaultDomain && (
            <span className="opacity-30">{handleDefaultDomain}</span>
          )}
        </span>
        {post.record && (
          <PostText text={post.record.text} entities={post.record.entities} />
        )}
        {post.embed?.images && (
          <PostImages post={post} images={post.embed?.images} />
        )}
        <div className="opacity-50 mt-2 text-sm">
          <span className="inline-block w-16 lg:w-32">
            💬 {post.replyCount || ""}
          </span>
          <span className="inline-block w-16 lg:w-32">
            ⇵ {post.repostCount || ""}
          </span>
          <span className="inline-block w-16 lg:w-32">
            ♡ {post.upvoteCount || ""}
          </span>
        </div>
      </div>
    </div>
  );
}
