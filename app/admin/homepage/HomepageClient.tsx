"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export default function HomepageClient({ initialData }: { initialData: Record<string, unknown> | null }) {
  const [data, setData] = useState<Record<string, unknown>>(initialData || {});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const hero = (data.hero as Record<string, string>) || {};
  const about = (data.about as Record<string, string>) || {};
  const fpvSection = (data.fpvSection as Record<string, string>) || {};

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      let res;
      if (data._id) {
        res = await fetch(`/api/homepage/${data._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/homepage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(json.error || "Failed to update homepage content.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving homepage content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Homepage Content Editor</h1>
          <p className="text-xs text-slate-500 font-medium">Manage hero, about, and showcase copy across the site</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 text-white font-bold text-xs shadow-md disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saved ? "Saved Changes!" : "Save All Changes"}</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="rounded-2xl vfx-glass-light p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-cyan-800 border-b border-slate-200 pb-2">
          Hero Section Copy
        </h2>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Eyebrow Tagline</label>
          <input
            type="text"
            value={hero.eyebrow || ""}
            onChange={(e) =>
              setData({ ...data, hero: { ...hero, eyebrow: e.target.value } })
            }
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Main Headline</label>
          <textarea
            rows={2}
            value={hero.title || ""}
            onChange={(e) =>
              setData({ ...data, hero: { ...hero, title: e.target.value } })
            }
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 resize-none shadow-xs"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Hero Subtitle Description</label>
          <textarea
            rows={3}
            value={hero.description || ""}
            onChange={(e) =>
              setData({ ...data, hero: { ...hero, description: e.target.value } })
            }
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 resize-none shadow-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Primary CTA Text</label>
            <input
              type="text"
              value={hero.primaryCtaText || ""}
              onChange={(e) =>
                setData({ ...data, hero: { ...hero, primaryCtaText: e.target.value } })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-1">Secondary CTA Text</label>
            <input
              type="text"
              value={hero.secondaryCtaText || ""}
              onChange={(e) =>
                setData({ ...data, hero: { ...hero, secondaryCtaText: e.target.value } })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-2xl vfx-glass-light p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-indigo-800 border-b border-slate-200 pb-2">
          Who We Are / About Section
        </h2>

        <div>
          <label className="block text-slate-700 font-bold mb-1">About Eyebrow</label>
          <input
            type="text"
            value={about.eyebrow || ""}
            onChange={(e) =>
              setData({ ...data, about: { ...about, eyebrow: e.target.value } })
            }
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">About Title</label>
          <input
            type="text"
            value={about.title || ""}
            onChange={(e) =>
              setData({ ...data, about: { ...about, title: e.target.value } })
            }
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">About Description</label>
          <textarea
            rows={3}
            value={about.description || ""}
            onChange={(e) =>
              setData({ ...data, about: { ...about, description: e.target.value } })
            }
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 resize-none shadow-xs"
          />
        </div>
      </div>

      {/* FPV Section */}
      <div className="rounded-2xl vfx-glass-light p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-sky-800 border-b border-slate-200 pb-2">
          FPV Drone Reel Section
        </h2>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Section Title</label>
          <input
            type="text"
            value={fpvSection.title || ""}
            onChange={(e) =>
              setData({ ...data, fpvSection: { ...fpvSection, title: e.target.value } })
            }
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Section Description</label>
          <textarea
            rows={2}
            value={fpvSection.description || ""}
            onChange={(e) =>
              setData({ ...data, fpvSection: { ...fpvSection, description: e.target.value } })
            }
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 resize-none shadow-xs"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Video Embed URL (YouTube/Vimeo)</label>
          <input
            type="text"
            value={fpvSection.video || ""}
            onChange={(e) =>
              setData({ ...data, fpvSection: { ...fpvSection, video: e.target.value } })
            }
            placeholder="https://www.youtube.com/embed/..."
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-[11px] shadow-xs"
          />
        </div>
      </div>
    </form>
  );
}
