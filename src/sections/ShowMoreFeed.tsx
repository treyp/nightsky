import { FormEvent } from "react";
import Button from "../components/Button";

interface ShowMoreFeedProps {
  loading: boolean;
  onClick: (e: FormEvent<HTMLButtonElement>) => void;
  isMore: boolean;
}

export default function ShowMoreFeed({
  loading,
  onClick,
  isMore,
}: ShowMoreFeedProps) {
  if (!isMore) {
    return (
      <p className="text-sm text-center text-gray-400 mt-2 mb-4">- the end -</p>
    );
  }
  return (
    <div className="px-4">
      <Button
        className={`btn-block my-4 ${loading && "loading"}`}
        onClick={onClick}
        disabled={loading}
      >
        Show more
      </Button>
    </div>
  );
}
