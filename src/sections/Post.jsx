import PostImages from "./PostImages";
import PostMeta from "./PostMeta";
import PostText from "./PostText";
import QuotedPost from "./QuotedPost";

export default function Post({ post, isParent, isReply }) {
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
        <PostMeta post={post} />
        {post.record && (
          <PostText text={post.record.text} entities={post.record.entities} />
        )}
        {post.embed?.record && <QuotedPost post={post.embed?.record} />}
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
