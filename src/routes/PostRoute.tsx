import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { useParams } from "react-router-dom";
import PostSkeleton from "../sections/PostSkeleton";
import Post from "../sections/Post";
import classNames from "classnames";
import { ThreadViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

interface ThreadViewProps {
  threadViewPost: ThreadViewPost;
}

function RecursiveParent({ threadViewPost }: ThreadViewProps) {
  return (
    <>
      {threadViewPost.parent && (
        <RecursiveParent
          threadViewPost={threadViewPost.parent as ThreadViewPost}
        />
      )}
      {threadViewPost.post && <Post post={threadViewPost.post} isParent />}
    </>
  );
}

function RecursiveReply({ threadViewPost }: ThreadViewProps) {
  return (
    <>
      {threadViewPost.post && (
        <Post
          post={threadViewPost.post}
          isParent={!!threadViewPost.replies?.length}
        />
      )}
      {threadViewPost.replies?.map((reply) => (
        <RecursiveReply
          threadViewPost={reply as ThreadViewPost}
          key={(reply as ThreadViewPost).post?.cid}
        />
      ))}
    </>
  );
}

export default function PostRoute() {
  const { state: authState } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [thread, setThread] = useState<ThreadViewPost>();
  const { authorHandle, postRecordId } = useParams();

  const fetchPost = useCallback(() => {
    const agent = authState.agent;
    if (!agent || !postRecordId || !authorHandle) {
      return;
    }
    setIsFetching(true);
    agent.api.app.bsky.actor
      .getProfile({ actor: authorHandle })
      .then(({ success: profileSuccess, data: profileData }) => {
        if (!profileSuccess || !profileData) {
          console.error("Profile fetch failed", profileSuccess, profileData);
          setIsFetching(false);
          return;
        }
        console.log("Profile fetch success", profileSuccess, profileData);
        agent.api.app.bsky.feed
          .getPostThread({
            uri: `at://${profileData.did}/app.bsky.feed.post/${postRecordId}`,
          })
          .then(({ success: threadSuccess, data: threadData }) => {
            if (!threadSuccess || !threadData.thread) {
              console.error(
                "Post Thread fetch failed",
                threadSuccess,
                threadData
              );
            } else {
              console.log(
                "Post Thread fetch success",
                threadSuccess,
                threadData
              );
              setThread(threadData.thread as ThreadViewPost);
            }
            setIsFetching(false);
          });
      });
  }, [authState.agent, authorHandle, postRecordId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div className="w-full">
      {!thread && isFetching && <PostSkeleton />}
      {thread?.parent && (
        <RecursiveParent threadViewPost={thread.parent as ThreadViewPost} />
      )}
      {thread && (
        <div
          className={classNames("border-gray-800", {
            "border-t pt-4": !!thread.parent,
            "border-b mb-2 pb-2": !!thread.replies?.length,
          })}
        >
          <Post
            post={thread.post}
            isParent={!!thread.replies?.length}
            isFeatured
          />
        </div>
      )}
      {thread?.replies?.map((reply) => (
        <RecursiveReply
          threadViewPost={reply as ThreadViewPost}
          key={(reply as ThreadViewPost).post?.cid}
        />
      ))}
    </div>
  );
}
