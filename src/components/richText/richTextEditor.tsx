import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./textEditorMenuBar";

type TextEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string; // Add this line
};

export default function RichTextEditor({
  onChange,
  initialContent,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "h-56 cursor-text p-5 ring-offset-background focus-within:outline-none ",
        // "h-80 cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ",
      },
    },
    immediatelyRender: false,
  });
  return (
    <div className="">
      <TextEditorMenuBar editor={editor} />
      <EditorContent
        editor={editor}
        style={{ whiteSpace: "pre-wrap" }}
        className="overflow-y-auto border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none break-words" 
      />
    </div>
  );
}
