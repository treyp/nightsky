import { UserIcon } from "@heroicons/react/24/solid";

interface AvatarProps {
  avatar?: string;
  handle?: string;
}

export default function Avatar({ avatar, handle }: AvatarProps) {
  return avatar ? (
    <img src={avatar} alt={handle} className="aspect-square" />
  ) : (
    <UserIcon className="border-2 border-primary-content bg-primary rounded-full p-2 color-primary-content" />
  );
}
