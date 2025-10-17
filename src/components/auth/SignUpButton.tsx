import { SignupButtonProps } from "@/types/types";
import Link from "next/link";
export default function SignUpButton({
  href = "/signup",
  variant = "button",
}: SignupButtonProps) {
  let styles;
  if (variant === "button") {
    styles =
      "rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus-visible:bg-blue-700";
  } else {
    styles =
      "hover:underline text-blue-600 hover:decoration-2 focus-visible:underline focus-visible:decoration-2";
  }

  return (
    <>
      <Link href={href} className={`focus-visible:outline-none ${styles}`}>
        Sign Up
      </Link>
    </>
  );
}
