import React from "react";
import Post from "./Post";

export default function FeaturedPost() {
  return (
    <>
      <article className="mx-auto min-h-[calc(100vh-7rem)] max-w-7xl space-y-4 bg-gray-100 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <h1 className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
          Featured Post
        </h1>
        <Post
          title="The Rise of AI in Creative Writing"
          content="Exploring how artificial intelligence is transforming storytelling and content creation."
          author="Siad Ali"
          createdAt={new Date("October 11, 2025")}
          slug="the-rise-of-ai-in-creative-writing"
          tags={["AI", "Content creation"]}
        />
      </article>
    </>
  );
}
