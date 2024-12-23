import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./textEditorMenuBar";
import Placeholder from "@tiptap/extension-placeholder";

type TextEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
  placeholder?: string;
};

export default function RichTextEditor({
  onChange,
  initialContent,
  placeholder = "Nhập nội dung ở đây...",
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder, // Văn bản của placeholder
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "relative h-56 cursor-text p-5 ring-offset-background focus-within:outline-none",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <EditorContent
        editor={editor}
        style={{ whiteSpace: "pre-wrap" }}
        className="overflow-y-auto border rounded-md break-words"
      />
    </div>
  );
}
