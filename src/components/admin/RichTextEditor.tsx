"use client";

import { Editor } from "@tinymce/tinymce-react";

/** Self-hosted TinyMCE (assets served from /public/tinymce). */
export default function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
      value={value}
      onEditorChange={(html) => onChange(html)}
      init={{
        height: 380,
        menubar: false,
        branding: false,
        statusbar: false,
        plugins: "lists link autolink",
        toolbar:
          "undo redo | blocks fontsizeinput | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist | link removeformat",
        block_formats: "Heading=h3; Subheading=h4; Paragraph=p",
        content_style: "body{font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:14px;line-height:1.6}",
      }}
    />
  );
}
