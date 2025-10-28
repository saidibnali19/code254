import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EditPostForm from "@/components/EditPostForm";

export default function EditPostPage(context: any) {
  return (
    <ProtectedRoute>
      <article className="mx-auto max-w-5xl px-4 py-10">
        <EditPostForm slug={context.params.slug} />
      </article>
    </ProtectedRoute>
  );
}
