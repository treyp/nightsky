import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import Button from "../components/Button";
import Feed from "../sections/Feed";
import FeedSkeleton from "../sections/FeedSkeleton";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { state: authState } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [feed, setFeed] = useState(null);
  let resetFeed = false;
  const [cursor, setCursor] = useState(null);
  let resetCursor = false;
  const { authorHandle } = useParams();

  const fetchNextPage = () => {
    if (!authState.agent) {
      return;
    }
    const feedOptions = { actor: authorHandle, limit: 50 };
    if (cursor && !resetCursor) {
      feedOptions.cursor = cursor;
    }
    setIsFetching(true);
    authState.agent.api.app.bsky.feed
      .getAuthorFeed(feedOptions)
      .then(({ success, data }) => {
        if (!success || !data.feed || !data.cursor) {
          console.error("Timeline fetch failed", success, data);
        }
        console.log("Timeline fetch success", success, data);
        setFeed(((!resetFeed && feed) || []).concat(data.feed));
        setCursor(data.cursor);
        setIsFetching(false);
        resetFeed = false;
        resetCursor = false;
      });
  };

  useEffect(() => {
    resetFeed = true;
    resetCursor = true;
    fetchNextPage();
  }, [authState.agent, authorHandle]);

  const showMore = () => {
    fetchNextPage();
  };

  return (
    <div className="w-full">
      {!feed && isFetching && <FeedSkeleton />}
      {feed && <Feed feed={feed} />}
      {feed && (
        <Button
          className={`btn-block my-4 ${isFetching && "loading"}`}
          onClick={showMore}
          disabled={isFetching}
        >
          Show more
        </Button>
      )}
    </div>
  );
}
