"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export default function SettingsClient({ initialSettings }: { initialSettings: Record<string, string> | null }) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings || {});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      let res;
      if (settings._id) {
        res = await fetch(`/api/site-settings/${settings._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        });
      } else {
        res = await fetch("/api/site-settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        });
      }

      const json = await res.json();
      if (res.ok && json.success) {
        setSettings(json.data);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(json.error || "Failed to update site settings.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving site settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Site Settings & Contact Info</h1>
          <p className="text-xs text-slate-500 font-medium">Manage global contact numbers, emails, and social links</p>
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
          <span>{saved ? "Saved Settings!" : "Save Settings"}</span>
        </button>
      </div>

      <div className="rounded-2xl vfx-glass-light p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-cyan-800 border-b border-slate-200 pb-2">
          General Info & Branding
        </h2>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Site Brand Name</label>
          <input
            type="text"
            value={settings.siteName || ""}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Global Meta Description</label>
          <textarea
            rows={2}
            value={settings.description || ""}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 resize-none shadow-xs"
          />
        </div>
      </div>

      {/* Direct Contact */}
      <div className="rounded-2xl vfx-glass-light p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-indigo-800 border-b border-slate-200 pb-2">
          Contact Numbers & Location
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
            <input
              type="text"
              value={settings.phone || ""}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Email Address</label>
            <input
              type="email"
              value={settings.email || ""}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp || ""}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Street Address</label>
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">City / Region</label>
            <input
              type="text"
              value={settings.city || ""}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-2xl vfx-glass-light p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-sky-800 border-b border-slate-200 pb-2">
          Social Profiles & Footer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Instagram URL</label>
            <input
              type="text"
              value={settings.instagram || ""}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={settings.linkedin || ""}
              onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">YouTube URL</label>
            <input
              type="text"
              value={settings.youtube || ""}
              onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Footer Copyright Text</label>
          <input
            type="text"
            value={settings.footerText || ""}
            onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs"
          />
        </div>
      </div>
    </form>
  );
}
