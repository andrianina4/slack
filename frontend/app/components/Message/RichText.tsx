"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, UnderlineIcon } from "lucide-react";

function ToolbarButton({ editor, command, icon, isActive, level = null }: any) {
  const isActiveClass = isActive
    ? editor.isActive(isActive, level ? { level } : {}) && "bg-gray-300"
    : "";

  return (
    <button
      onClick={() => editor.chain().focus()[command](level).run()}
      className={`p-2 rounded-md transition hover:bg-gray-100 ${isActiveClass}`}
    >
      {icon}
    </button>
  );
}

const RichText = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Hello World! 🌎️</p>",
  });

  if (!editor) return null;
  return (
    <div className=" p-2 border border-gray-300 rounded-lg shadow-lg bg-white w-full">
      {/* Toolbar */}
      <div className="flex space-x-1 border-b border-gray-200 pb-1 mb-1">
        <ToolbarButton
          editor={editor}
          command="toggleBold"
          icon={<Bold />}
          isActive="bold"
        />
        <ToolbarButton
          editor={editor}
          command="toggleItalic"
          icon={<Italic />}
          isActive="italic"
        />
        <ToolbarButton
          editor={editor}
          command="toggleUnderline"
          icon={<UnderlineIcon />}
          isActive="underline"
        />
      </div>

      <div className="  rounded-md p-3  ">
        <EditorContent editor={editor} className="outline-0" />
      </div>
    </div>
  );
};

export default RichText;
