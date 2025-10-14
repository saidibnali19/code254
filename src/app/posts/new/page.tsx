import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NewPostForm from "@/components/NewPostForm";

export default function NewPostPage() {
  return (
    <ProtectedRoute>
      <article className="min-h-[calc(100vh-7rem)] bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
        <NewPostForm />
      </article>
    </ProtectedRoute>
  );
}
