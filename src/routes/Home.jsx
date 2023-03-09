import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import Button from "../components/Button";
import Code from "../components/Code";
import { AUTH_ACTION_LOGOUT } from "../consts";

export default function Home() {
  const { dispatch: authDispatch, state: authState } = useContext(AuthContext);
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
    <div>
      {feed && <Code>{JSON.stringify(feed)}</Code>}
      <Button
        onClick={() => authDispatch({ type: AUTH_ACTION_LOGOUT })}
        className="mt-4"
      >
        Sign out
      </Button>
    </div>
  );
}
