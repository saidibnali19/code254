import { SignupButtonProps } from "@/types/types";
import Link from "next/link";
export default function SignUpButton({
  href = "/signup",
  variant = "button",
}: SignupButtonProps) {
  let styles;
  if (variant === "button") {
    styles = "btn btn-primary";
  } else {
    styles =
      "hover:underline text-blue-600 hover:decoration-2 focus-visible:underline focus-visible:decoration-2";
  }

  return (
    <>
      <Link href={href} className={` ${styles}`}>
        Sign Up
      </Link>
    </>
  );
}
