import PostImages from "./PostImages";
import PostMeta from "./PostMeta";
import PostText from "./PostText";

export default function QuotedPost({ post, media }) {
  return (
    <div className="border border-accent rounded mt-2 mr-4 p-2">
      <div>
        <div className="avatar">
          <div className="w-4 rounded-full">
            <img src={post.author.avatar} />
          </div>
        </div>{" "}
        <PostMeta post={post} />
        {post.value && <PostText text={post.value.text} />}
        {media?.images && <PostImages post={post} images={media?.images} />}
      </div>
    </div>
  );
}
