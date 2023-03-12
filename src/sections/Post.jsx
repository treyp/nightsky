import { useContext } from "react";
import { AuthContext } from "../App";
import PostImages from "./PostImages";
import PostText from "./PostText";

const timeUnits = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

function relativeTimeSince(sinceDate) {
  const now = new Date();
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
    style: "narrow",
  });
  const elapsedTime = sinceDate - now;
  for (var unit in timeUnits) {
    if (Math.abs(elapsedTime) > timeUnits[unit] || unit == "second") {
      return rtf.format(Math.round(elapsedTime / timeUnits[unit]), unit);
    }
  }
}

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

  const createdAt = post.record?.createdAt
    ? new Date(post.record?.createdAt)
    : null;
  const timeAgo = createdAt ? relativeTimeSince(createdAt) : null;

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
        </span>{" "}
        {createdAt && timeAgo && (
          <span
            className="text-primary-content"
            title={createdAt.toLocaleString()}
          >
            {"· "}
            {timeAgo}
          </span>
        )}
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
