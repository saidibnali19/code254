import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EditPostForm from "@/components/EditPostForm";

export default function EditPostPage({ params }: { params: { slug: string } }) {
  return (
    <ProtectedRoute>
      <article className="mx-auto max-w-5xl px-4 py-10">
        <EditPostForm slug={params.slug} />
      </article>
    </ProtectedRoute>
  );
}
