import { Link, useNavigate } from "react-router-dom";
import PostImages from "./PostImages";
import PostInteractions from "./PostInteractions";
import PostMeta from "./PostMeta";
import PostText from "./PostText";
import QuotedPost from "./QuotedPost";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Record } from "@atproto/api/dist/client/types/app/bsky/feed/post";
import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
} from "@atproto/api";
import Avatar from "./Avatar";
import PostLinkPreview from "./PostLinkPreview";

function isNodeInAnchor(node: Node, stopAtNode: Node): boolean {
  if (!node || node === stopAtNode) {
    return false;
  }
  if (node instanceof HTMLAnchorElement) {
    return true;
  }
  if (node.parentNode) {
    return isNodeInAnchor(node.parentNode, stopAtNode);
  }
  return false;
}

interface PostProps {
  post: PostView;
  isParent?: boolean;
  isFeatured?: boolean;
}

export default function Post({ post, isParent, isFeatured }: PostProps) {
  const navigate = useNavigate();
  const handle = post.author.handle || "";
  const recordId = post.uri.split("/").at(-1);
  const record = post.record as Record | undefined;
  const embedRecord = post.embed?.record as
    | AppBskyEmbedRecord.View["record"]
    | AppBskyEmbedRecordWithMedia.View["record"]
    | undefined;
  const embedMedia = post.embed?.media as
    | AppBskyEmbedRecordWithMedia.View["media"]
    | undefined;
  const embedImages = post.embed?.images as
    | AppBskyEmbedImages.View["images"]
    | undefined;
  const embedExternal = post.embed?.external as
    | AppBskyEmbedExternal.View["external"]
    | undefined;

  const postBody = (
    <>
      {record?.text && <PostText text={record.text} isFeatured={isFeatured} />}
      {embedRecord && <QuotedPost record={embedRecord} media={embedMedia} />}
      {embedImages && <PostImages post={post} images={embedImages} />}
      {embedExternal && <PostLinkPreview external={embedExternal} />}
      <PostInteractions post={post} />
    </>
  );

  return (
    <>
      <div
        className="grid grid-cols-[3rem_1fr] gap-2 pb-2"
        onClick={(e) => {
          console.log("Post clicked", e);
          if (e.defaultPrevented) {
            return;
          }
          if (
            e.target instanceof Node &&
            isNodeInAnchor(e.target, e.currentTarget)
          ) {
            return;
          }
          navigate(`/profile/${handle}/post/${recordId}`);
        }}
      >
        <div className="flex flex-col">
          <div className="avatar flex-none">
            <div className="w-12 rounded-full">
              <Link to={`/profile/${handle}`}>
                <Avatar avatar={post.author.avatar} handle={handle} />
              </Link>
            </div>
          </div>
          {isParent && !isFeatured && (
            <div className="bg-gray-800 w-[2px] mx-auto mt-2 flex-1 h-auto min-h-6"></div>
          )}
        </div>
        <div className="pr-4 overflow-hidden">
          <PostMeta post={post} />
          {!isFeatured && postBody}
        </div>
      </div>
      {isFeatured && <div>{postBody}</div>}
    </>
  );
}
