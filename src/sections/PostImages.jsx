export default function PostImages({ post, images }) {
  return (
    <div className="my-4">
      {images.map((image, imageKey) => (
        <a href={image.fullsize} target="_blank">
          <img
            key={`${post.cid}-image-${imageKey}`}
            src={image.thumb}
            alt={image.alt}
            className="mt-2 max-w-full md:max-w-xs rounded"
          />
        </a>
      ))}
    </div>
  );
}
