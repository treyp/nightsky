import {
  FeedViewPost,
  PostView,
  ReasonRepost,
  ReplyRef,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Post from "./Post";

function isPostView(post: ReplyRef["parent"]): post is PostView {
  return !!post.uri && !!post.cid && !!post.author;
}

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
            {feedItem.reply?.parent && isPostView(feedItem.reply.parent) && (
              <Post post={feedItem.reply.parent} isParent />
            )}
            <Post post={feedItem.post} />
          </div>
        ))}
    </div>
  );
}
