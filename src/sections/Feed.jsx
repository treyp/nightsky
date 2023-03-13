import Code from "../components/Code";
import Post from "./Post";

export default function Feed({ feed }) {
  return (
    <div>
      {feed &&
        feed.map((feedItem) => (
          <div
            className="border-b border-accent my-2 px-4"
            key={feedItem.post?.cid}
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
