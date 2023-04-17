import { ViewImage } from "@atproto/api/dist/client/types/app/bsky/embed/images";
import { ViewRecord } from "@atproto/api/dist/client/types/app/bsky/embed/record";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

interface PostImagesProps {
  post: PostView | ViewRecord;
  images: ViewImage[];
}

export default function PostImages({ post, images }: PostImagesProps) {
  return (
    <div className="my-4">
      {images.map((image, imageKey) => (
        <a
          href={image.fullsize}
          target="_blank"
          key={`${post.cid}-image-${imageKey}`}
        >
          <img
            src={image.thumb}
            alt={image.alt}
            className="mt-2 max-w-full md:max-w-xs rounded border-gray-800 border inline-block"
          />
        </a>
      ))}
    </div>
  );
}
