import { getInitials } from "@/utils/getInitials";
interface UserAvatarProps {
  authorName: string;
  size?: "small" | "medium" | "large";
}
export default function UserAvatar({
  authorName,
  size = "medium",
}: UserAvatarProps) {
  let avatarSize;
  if (size === "small") {
    avatarSize = "h-10 w-10";
  } else if (size === "medium") {
    avatarSize = "h-14 w-14";
  } else {
    avatarSize = "h-24 w-24";
  }
  return (
    <>
      <div
        className={`flex ${avatarSize} items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-semibold text-white`}
      >
        {getInitials(authorName)}
      </div>
    </>
  );
}
