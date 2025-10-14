export default function LogOutButton({ setUser }) {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("accesstoken");
    setUser(null);
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="cursor-pointer rounded-lg border border-red-600 px-4 py-2 text-red-600 transition hover:bg-red-600 hover:text-white focus-visible:bg-red-600 focus-visible:text-white focus-visible:outline-none"
      >
        Logout
      </button>
    </>
  );
}
