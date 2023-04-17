import {
  FeedViewPost,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Post from "./Post";

interface FeedProps {
  feed: FeedViewPost[];
}

export default function Feed({ feed }: FeedProps) {
  return (
    <div>
      {feed &&
        feed.map((feedItem) => (
          <div
            className="border-b border-gray-800 my-2 px-4"
            key={`${feedItem.post?.cid}${feedItem.reason?.$type || ""}${
              (feedItem.reason as ReasonRepost)?.by?.did || ""
            }`}
          >
            {feedItem.reply?.parent && (
              <Post post={feedItem.reply.parent} isParent />
            )}
            <Post post={feedItem.post} />
          </div>
        ))}
    </div>
  );
}
