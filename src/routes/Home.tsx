import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../Auth";
import Feed from "../sections/Feed";
import FeedSkeleton from "../sections/FeedSkeleton";
import {
  QueryParams,
  OutputSchema,
} from "@atproto/api/dist/client/types/app/bsky/feed/getTimeline";
import ShowMoreFeed from "../sections/ShowMoreFeed";

const FEED_LIMIT = 50;

export default function Home() {
  const { state: authState } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [feed, setFeed] = useState<OutputSchema["feed"]>();
  const [cursor, setCursor] = useState<OutputSchema["cursor"]>();

  const fetchNextPage = useCallback(() => {
    if (!authState.agent) {
      return;
    }
    const timelineOptions: QueryParams = { limit: FEED_LIMIT };
    if (cursor) {
      timelineOptions.cursor = cursor;
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
  }, [authState.agent, cursor, feed]);

  useEffect(() => {
    fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMore = () => {
    fetchNextPage();
  };

  return (
    <div className="w-full">
      {!feed && isFetching && <FeedSkeleton />}
      {feed && <Feed feed={feed} />}
      {feed && <ShowMoreFeed loading={isFetching} onClick={showMore} isMore />}
    </div>
  );
}
