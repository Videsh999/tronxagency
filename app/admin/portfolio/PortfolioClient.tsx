"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react";
export type PortfolioData = { id?: string; _id?: string; title: string; slug?: string; category?: string; description?: string; shortDescription?: string; image?: string; client?: string; tags?: string[]; technologies?: string[]; order?: number; isFeatured?: boolean; isActive?: boolean; published?: boolean };

export default function AdminPortfolioClient({ initialItems }: { initialItems: PortfolioData[] }) {
  const [items, setItems] = useState<PortfolioData[]>(initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Hospitality",
    shortDescription: "",
    description: "",
    image: "",
    technologies: "",
    published: true,
    order: 0,
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      title: "",
      slug: "",
      category: "Hospitality",
      shortDescription: "",
      description: "",
      image: "",
      technologies: "",
      published: true,
      order: items.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: PortfolioData) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "Hospitality",
      shortDescription: item.shortDescription || "",
      description: item.description || "",
      image: item.image || "",
      technologies: item.technologies ? item.technologies.join(", ") : "",
      published: item.published ?? true,
      order: item.order ?? 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this portfolio project?")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (res.ok && json.success) {
        setItems(items.filter((i) => i._id !== id));
      } else {
        alert(json.error || "Failed to delete item.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting item.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      slug: form.slug.toLowerCase().trim().replace(/\s+/g, "-"),
      category: form.category,
      shortDescription: form.shortDescription,
      description: form.description,
      image: form.image,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      published: form.published,
      order: Number(form.order),
    };

    try {
      if (editingItem?._id) {
        const res = await fetch(`/api/portfolio/${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setItems(items.map((i) => (i._id === editingItem._id ? json.data : i)));
          setModalOpen(false);
        } else {
          alert(json.error || "Failed to update item.");
        }
      } else {
        const res = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setItems([...items, json.data]);
          setModalOpen(false);
        } else {
          alert(json.error || "Failed to create item.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error saving portfolio item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Portfolio Management</h1>
          <p className="text-xs text-slate-500 font-medium">Manage featured client case studies and projects</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 text-white font-bold text-xs shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="rounded-2xl vfx-glass-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-500 uppercase tracking-wider border-b border-slate-200 bg-slate-50/80 font-bold">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Project Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Technologies</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-cyan-600">{item.order}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-[10px] font-mono text-slate-500">/{item.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-[10px] font-bold text-cyan-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    {item.technologies?.join(", ")}
                  </td>
                  <td className="p-4">
                    {item.published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] uppercase bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-500 font-bold text-[10px] uppercase bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        <XCircle className="w-3.5 h-3.5" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-cyan-100 text-slate-600 hover:text-cyan-700 transition-colors border border-slate-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-colors border border-slate-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-2xl space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">
              {editingItem ? "Edit Portfolio Project" : "Add Portfolio Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                  >
                    <option value="Hospitality">Hospitality</option>
                    <option value="Hotels">Hotels</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Image URL</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Description</label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 resize-none shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  placeholder="Next.js, FPV Drone, GMB SEO"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="rounded bg-white border-slate-200 text-cyan-600 focus:ring-0"
                />
                <label htmlFor="published" className="text-slate-700 font-bold">Published</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 text-white font-bold flex items-center gap-2 disabled:opacity-50 shadow-md"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
