import PostImages from "./PostImages";
import PostInteractions from "./PostInteractions";
import PostMeta from "./PostMeta";
import PostText from "./PostText";
import QuotedPost from "./QuotedPost";

export default function Post({ post, isParent, isReply }) {
  return (
    <div className="flex pb-2">
      <div className="flex-none pr-2 flex flex-col">
        <div className="avatar flex-none">
          <div className="w-12 rounded-full">
            <img src={post.author.avatar} />
          </div>
        </div>
        {isParent && (
          <div className="bg-gray-800 w-[2px] mx-auto mt-2 flex-1 h-auto min-h-6"></div>
        )}
      </div>
      <div className="flex-1 pr-4">
        <PostMeta post={post} />
        {post.record && (
          <PostText text={post.record.text} entities={post.record.entities} />
        )}
        {post.embed?.record && <QuotedPost post={post.embed?.record} />}
        {post.embed?.images && (
          <PostImages post={post} images={post.embed?.images} />
        )}
        <PostInteractions post={post} />
      </div>
    </div>
  );
}
