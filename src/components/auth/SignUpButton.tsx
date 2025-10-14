import Link from "next/link";
export default function SignUpButton() {
  return (
    <>
      <Link
        href="/signup"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus-visible:bg-blue-700 focus-visible:outline-none"
      >
        Sign Up
      </Link>
    </>
  );
}
