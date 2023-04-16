import { useAuth } from "../Auth";

export default function Handle({ handle }) {
  const { state: authState } = useAuth();

  const defaultDomain = `.${authState.service.slice(
    authState.service.indexOf("//") + "//".length
  )}`;
  const handleIsInDefaultDomain = handle.endsWith(defaultDomain);
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
