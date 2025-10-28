"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

interface TipTapEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class:
              "hljs bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto",
          },
        },
      }),

      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write your post content here...",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-blue max-w-none min-h-[300px] rounded-md border border-gray-700 bg-base-300 p-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }

    if (editor) {
      hljs.highlightAll(); // re-run highlighting whenever content updates
    }
  }, [content, editor]);

  if (!mounted || !editor) return <div>Loading editor...</div>;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="bg-base-200 flex flex-wrap items-center gap-2 rounded-md border border-gray-700 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("bold") ? "bg-blue-600 text-white" : "bg-base-300"
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("italic") ? "bg-blue-600 text-white" : "bg-base-300"
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("strike") ? "bg-blue-600 text-white" : "bg-base-300"
          }`}
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-600 text-white"
              : "bg-base-300"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-600 text-white"
              : "bg-base-300"
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 4 })
              ? "bg-blue-600 text-white"
              : "bg-base-300"
          }`}
        >
          H4
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 5 })
              ? "bg-blue-600 text-white"
              : "bg-base-300"
          }`}
        >
          H5
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 6 })
              ? "bg-blue-600 text-white"
              : "bg-base-300"
          }`}
        >
          H6
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white"
              : "bg-base-300"
          }`}
        >
          Bullet
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white"
              : "bg-base-300"
          }`}
        >
          Numbered
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="bg-base-300 rounded px-2 py-1"
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("codeBlock")
              ? "bg-blue-600 text-white"
              : "bg-base-300"
          }`}
        >
          Code
        </button>
      </div>

      {/* Editor */}
      <div className="max-h-[50svh] overflow-y-scroll">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
