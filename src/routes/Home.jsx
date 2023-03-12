import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import Code from "../components/Code";

export default function Home() {
  const { state: authState } = useContext(AuthContext);
  const [feed, setFeed] = useState(null);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    if (!authState.agent) {
      return;
    }
    authState.agent.api.app.bsky.feed
      .getTimeline({ limit: 50 })
      .then(({ success, data }) => {
        if (!success || !data.feed || !data.cursor) {
          console.error("Timeline fetch failed", success, data);
        }
        console.log("Timeline fetch success", success, data);
        setFeed(data.feed);
        setCursor(data.cursor);
      });
  }, [authState.agent]);

  return (
    <div className="max-w-full">
      {feed && <Code>{JSON.stringify(feed, undefined, 4)}</Code>}
    </div>
  );
}
