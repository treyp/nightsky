import {
  ChatBubbleBottomCenterIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function PostInteractions({ post }) {
  return (
    <div className="opacity-50 mt-2 text-sm">
      <span className="inline-block w-16 lg:w-32">
        <ChatBubbleBottomCenterIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.replyCount || ""}
      </span>
      <span className="inline-block w-16 lg:w-32">
        <ArrowPathRoundedSquareIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.repostCount || ""}
      </span>
      <span className="inline-block w-16 lg:w-32">
        <HeartIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.upvoteCount || ""}
      </span>
    </div>
  );
}
