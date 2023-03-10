export default function PostImages({ post, images }) {
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
            className="mt-2 max-w-full md:max-w-xs rounded border-gray-800 border"
          />
        </a>
      ))}
    </div>
  );
}
