function PostSkeleton() {
  const contentLines = Math.floor(Math.random() * 3);
  const contentWidths = ["w-1/5", "w-3/5", "w-4/5", "w-full"];
  let content = [];
  for (let index = 0; index <= contentLines; index++) {
    content.push(
      <div
        key={`content-line-${index}`}
        className={`h-2 ${
          contentWidths[Math.floor(Math.random() * contentWidths.length)]
        } bg-base-content rounded`}
      ></div>
    );
  }
  return (
    <div className="flex space-x-2 pl-4 pr-8 mt-8">
      <div className="rounded-full bg-base-content h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-2 w-1/2 bg-base-content rounded"></div>
        {content}
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          <div className="h-2 bg-base-content rounded"></div>
          <div className="h-2 bg-base-content rounded"></div>
          <div className="h-2 bg-base-content rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default function FeedSkeleton() {
  const skeletonPosts = [];
  for (let index = 0; index < 5; index++) {
    skeletonPosts.push(<PostSkeleton key={`post-skeleton-${index}`} />);
  }
  return <div className="animate-pulse w-full -mt-4">{skeletonPosts}</div>;
}
