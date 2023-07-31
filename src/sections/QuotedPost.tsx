import PostImages from "./PostImages";
import PostMeta from "./PostMeta";
import PostText from "./PostText";
import { AppBskyEmbedRecord, AppBskyEmbedRecordWithMedia } from "@atproto/api";
import { Record } from "@atproto/api/dist/client/types/app/bsky/feed/post";
import { ViewRecord } from "@atproto/api/dist/client/types/app/bsky/embed/record";
import { ViewImage } from "@atproto/api/dist/client/types/app/bsky/embed/images";

interface QuotedPostProps {
  record:
    | AppBskyEmbedRecord.View["record"]
    | AppBskyEmbedRecordWithMedia.View["record"];
  media?: AppBskyEmbedRecordWithMedia.View["media"];
}

export default function QuotedPost({ record, media }: QuotedPostProps) {
  const post =
    (record.record as ViewRecord | undefined) ?? (record as ViewRecord);
  const postValue = post.value as Record | undefined;
  const mediaImages = media?.images as ViewImage[] | undefined;

  return (
    <div className="border border-accent rounded mt-2 mr-4 p-2">
      <div>
        <div className="avatar">
          <div className="w-4 rounded-full">
            <img src={(post.author || post.creator).avatar} />
          </div>
        </div>{" "}
        <PostMeta post={post} />
        {postValue && <PostText text={postValue.text} />}
        {mediaImages && <PostImages post={post} images={mediaImages} />}
      </div>
    </div>
  );
}
