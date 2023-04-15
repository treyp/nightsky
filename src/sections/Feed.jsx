import Code from "../components/Code";
import Post from "./Post";

export default function Feed({ feed }) {
  return (
    <div>
      {feed &&
        feed.map((feedItem) => (
          <div
            className="border-b border-gray-800 my-2 px-4"
            key={`${feedItem.post?.cid}${feedItem.reason?.$type || ""}${
              feedItem.reason?.by?.did || ""
            }`}
          >
            {feedItem.reply?.parent && (
              <Post post={feedItem.reply.parent} isParent />
            )}
            <Post post={feedItem.post} isReply={!!feedItem.reply?.parent} />
          </div>
        ))}
    </div>
  );
}
