import PostSkeleton from "./PostSkeleton";

export default function FeedSkeleton() {
  const skeletonPosts = [];
  for (let index = 0; index < 5; index++) {
    skeletonPosts.push(<PostSkeleton key={`post-skeleton-${index}`} />);
  }
  return <div className="animate-pulse w-full -mt-4">{skeletonPosts}</div>;
}
