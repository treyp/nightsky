import {
  ChatBubbleBottomCenterIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function PostInteractions({ post }) {
  return (
    <div className="text-gray-400 mt-2 text-sm grid grid-cols-3 max-w-xs">
      <div>
        <ChatBubbleBottomCenterIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.replyCount || ""}
      </div>
      <div>
        <ArrowPathRoundedSquareIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.repostCount || ""}
      </div>
      <div>
        <HeartIcon className="h-4 w-4 inline-block stroke-2 mr-2" />
        {post.upvoteCount || ""}
      </div>
    </div>
  );
}
