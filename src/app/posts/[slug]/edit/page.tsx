// app/posts/[id]/edit/page.tsx

import EditPostForm from "@/components/EditPostForm";

export default function EditPostPage({ params }: { params: { slug: string } }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <EditPostForm slug={params.slug} />
    </section>
  );
}
