import {
  ChatBubbleBottomCenterIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function PostInteractions({ post }) {
  const recordId = post.uri.split("/").at(-1);
  return (
    <div className="text-gray-400 mt-2 text-sm grid grid-cols-3 gap-8 w-60">
      <Link to={`/profile/${post.author?.handle}/post/${recordId}`}>
        <ChatBubbleBottomCenterIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.replyCount || ""}
      </Link>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          console.log(post);
        }}
      >
        <ArrowPathRoundedSquareIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.repostCount || ""}
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          console.log(post);
        }}
      >
        <HeartIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.upvoteCount || ""}
      </a>
    </div>
  );
}
