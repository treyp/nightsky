import PostImages from "./PostImages";
import PostMeta from "./PostMeta";
import PostText from "./PostText";

export default function QuotedPost({ post }) {
  return (
    <div className="border border-accent rounded mt-2 mr-4 p-2">
      <div>
        <div className="avatar">
          <div className="w-4 rounded-full">
            <img src={post.author.avatar} />
          </div>
        </div>{" "}
        <PostMeta post={post} />
        {post.record && (
          <PostText text={post.record.text} entities={post.record.entities} />
        )}
        {post.embed?.images && (
          <PostImages post={post} images={post.embed?.images} />
        )}
      </div>
    </div>
  );
}
