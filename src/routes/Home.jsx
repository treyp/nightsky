import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import Button from "../components/Button";
import Feed from "../sections/Feed";

export default function Home() {
  const { state: authState } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [feed, setFeed] = useState(null);
  const [cursor, setCursor] = useState(null);

  const fetchNextPage = () => {
    if (!authState.agent) {
      return;
    }
    const timelineOptions = { limit: 50 };
    if (cursor) {
      timelineOptions.before = cursor;
    }
    setIsFetching(true);
    authState.agent.api.app.bsky.feed
      .getTimeline(timelineOptions)
      .then(({ success, data }) => {
        if (!success || !data.feed || !data.cursor) {
          console.error("Timeline fetch failed", success, data);
        }
        console.log("Timeline fetch success", success, data);
        setFeed((feed || []).concat(data.feed));
        setCursor(data.cursor);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchNextPage();
  }, [authState.agent]);

  const showMore = () => {
    fetchNextPage();
  };

  return (
    <div className="max-w-full max-h-full">
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
