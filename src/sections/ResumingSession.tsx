import { useAuth } from "../Auth";

export default function ResumingSession() {
  const { state: authState } = useAuth();
  if (!authState.isResuming) {
    return null;
  }
  return (
    <div className="toast toast-center">
      <div className="alert alert-info w-max">
        <div>
          <span>Attempting to resume session…</span>
        </div>
      </div>
    </div>
  );
}
