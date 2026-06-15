"use client";

import Field from "./Field";
import type { Notes, Note } from "@/lib/content/types";

const input = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[13px] text-[#0A0A0A]";
const lab = "block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1";

export default function NotesEditor({ value, onChange }: { value: Notes; onChange: (v: Notes) => void }) {
  const posts = value.posts;
  const setPost = (i: number, patch: Partial<Note>) => {
    const next = posts.map((p, j) => (j === i ? ({ ...p, ...patch } as Note) : p));
    onChange({ ...value, posts: next });
  };
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= posts.length) return;
    const next = [...posts];
    [next[i], next[j]] = [next[j], next[i]];
    onChange({ ...value, posts: next });
  };
  const remove = (i: number) => onChange({ ...value, posts: posts.filter((_, j) => j !== i) });
  const add = () => {
    const blank: Note = {
      variant: "type", cat: "Category", date: "New", title: "New post", read: "3 min read",
      excerpt: "", body: "", bg: "#D8F24A", ink: "#0A0A0A", rotate: "-1deg",
      eyebrow: "", lines: ["NEW", "POST"], footer: "",
    };
    onChange({ ...value, posts: [blank, ...posts] });
  };

  return (
    <div className="space-y-5">
      {/* section header */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lab}>Eyebrow</label>
          <input className={input} value={value.eyebrow} onChange={(e) => onChange({ ...value, eyebrow: e.target.value })} />
        </div>
        <div>
          <label className={lab}>Heading</label>
          <input className={input} value={value.heading} onChange={(e) => onChange({ ...value, heading: e.target.value })} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#0A0A0A]">{posts.length} posts</span>
        <button onClick={add} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-4 py-1.5 hover:opacity-80 transition-opacity">+ New post</button>
      </div>

      {posts.map((p, i) => (
        <article key={i} className="rounded-2xl border border-black/10 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => move(i, -1)} className="text-black/40 hover:text-black text-xs" title="Up">▲</button>
              <button onClick={() => move(i, 1)} className="text-black/40 hover:text-black text-xs" title="Down">▼</button>
              <span className="text-[11px] text-black/40 uppercase tracking-wide">{p.cat || "Post"}</span>
            </div>
            <button onClick={() => remove(i)} className="text-black/40 hover:text-[#c0392b] text-sm" title="Delete post">✕</button>
          </div>

          <div>
            <label className={lab}>Title</label>
            <input className={input} value={p.title} onChange={(e) => setPost(i, { title: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div><label className={lab}>Category</label><input className={input} value={p.cat} onChange={(e) => setPost(i, { cat: e.target.value })} /></div>
            <div><label className={lab}>Date</label><input className={input} value={p.date} onChange={(e) => setPost(i, { date: e.target.value })} /></div>
            <div><label className={lab}>Read time</label><input className={input} value={p.read} onChange={(e) => setPost(i, { read: e.target.value })} /></div>
          </div>
          <div>
            <label className={lab}>Excerpt</label>
            <textarea className={`${input} resize-y`} rows={2} value={p.excerpt || ""} onChange={(e) => setPost(i, { excerpt: e.target.value })} />
          </div>
          <div>
            <label className={lab}>Body</label>
            <textarea className={`${input} resize-y leading-relaxed`} rows={8} value={p.body || ""} onChange={(e) => setPost(i, { body: e.target.value })} placeholder="Write your post…" />
          </div>

          <details className="rounded-lg bg-black/[0.02] p-3">
            <summary className="cursor-pointer text-[12px] text-black/55 select-none">Poster appearance</summary>
            <div className="mt-3">
              <Field k="post" value={p} onChange={(v) => onChange({ ...value, posts: posts.map((q, j) => (j === i ? (v as Note) : q)) })} />
            </div>
          </details>
        </article>
      ))}
    </div>
  );
}
