import { useAuth } from "../Auth";

interface HandleProps {
  handle: string;
}

export default function Handle({ handle }: HandleProps) {
  const { state: authState } = useAuth();

  const defaultDomain = authState.service
    ? `.${authState.service.slice(
        authState.service.indexOf("//") + "//".length
      )}`
    : "";
  const handleIsInDefaultDomain =
    defaultDomain && handle.endsWith(defaultDomain);
  const shortHandle = handleIsInDefaultDomain
    ? handle.slice(0, -1 * defaultDomain.length)
    : handle;
  const handleDefaultDomain = handleIsInDefaultDomain ? defaultDomain : "";

  return (
    <span className="text-gray-400">
      {shortHandle}
      {handleDefaultDomain && (
        <span className="text-gray-700">{handleDefaultDomain}</span>
      )}
    </span>
  );
}
