import { Link, useNavigate } from "react-router-dom";
import PostImages from "./PostImages";
import PostInteractions from "./PostInteractions";
import PostMeta from "./PostMeta";
import PostText from "./PostText";
import QuotedPost from "./QuotedPost";

function isNodeInAnchor(node, stopAtNode) {
  if (!node || node === stopAtNode) {
    return false;
  }
  return (
    node instanceof HTMLAnchorElement ||
    isNodeInAnchor(node.parentNode, stopAtNode)
  );
}

export default function Post({ post, isParent, isFeatured }) {
  const navigate = useNavigate();
  const handle = post.author?.handle || "";
  const recordId = post.uri.split("/").at(-1);

  const onPostClick = (e) => {
    console.log("Post clicked", e);
    if (e.defaultPrevented) {
      return;
    }
    if (isNodeInAnchor(e.target, e.currentTarget)) {
      return;
    }
    navigate(`/profile/${handle}/post/${recordId}`);
  };

  const postBody = (
    <>
      {post.record && (
        <PostText text={post.record.text} isFeatured={isFeatured} />
      )}
      {post.embed?.record && (
        <QuotedPost
          post={post.embed.record?.record || post.embed.record}
          media={post.embed.media}
        />
      )}
      {post.embed?.images && (
        <PostImages post={post} images={post.embed?.images} />
      )}
      <PostInteractions post={post} />
    </>
  );

  return (
    <>
      <div className="flex pb-2" onClick={onPostClick}>
        <div className="flex-none pr-2 flex flex-col">
          <div className="avatar flex-none">
            <div className="w-12 rounded-full">
              <Link to={`/profile/${handle}`}>
                <img src={post.author.avatar} />
              </Link>
            </div>
          </div>
          {isParent && !isFeatured && (
            <div className="bg-gray-800 w-[2px] mx-auto mt-2 flex-1 h-auto min-h-6"></div>
          )}
        </div>
        <div className="flex-1 pr-4">
          <PostMeta post={post} />
          {!isFeatured && postBody}
        </div>
      </div>
      {isFeatured && <div>{postBody}</div>}
    </>
  );
}
