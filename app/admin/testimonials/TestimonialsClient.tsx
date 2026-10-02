"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Star, Loader2 } from "lucide-react";
export type TestimonialData = { id?: string; _id?: string; name: string; company?: string; role?: string; content: string; rating?: number; avatar?: string; image?: string; isFeatured?: boolean; isActive?: boolean; published?: boolean };

export default function TestimonialsClient({ initialItems }: { initialItems: TestimonialData[] }) {
  const [items, setItems] = useState<TestimonialData[]>(initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialData | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    content: "",
    image: "",
    rating: 5,
    published: true,
    order: 0,
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      name: "",
      company: "",
      role: "",
      content: "",
      image: "",
      rating: 5,
      published: true,
      order: items.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: TestimonialData) => {
    setEditingItem(item);
    setForm({
      name: item.name || "",
      company: item.company || "",
      role: item.role || "",
      content: item.content || "",
      image: item.image || "",
      rating: item.rating || 5,
      published: item.published ?? true,
      order: (item as unknown as { order?: number }).order ?? 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (res.ok && json.success) {
        setItems(items.filter((i) => i._id !== id));
      } else {
        alert(json.error || "Failed to delete testimonial.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting testimonial.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      company: form.company,
      role: form.role,
      content: form.content,
      image: form.image,
      rating: Number(form.rating),
      published: form.published,
      order: Number(form.order),
    };

    try {
      if (editingItem?._id) {
        const res = await fetch(`/api/testimonials/${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setItems(items.map((i) => (i._id === editingItem._id ? json.data : i)));
          setModalOpen(false);
        } else {
          alert(json.error || "Failed to update testimonial.");
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setItems([...items, json.data]);
          setModalOpen(false);
        } else {
          alert(json.error || "Failed to create testimonial.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error saving testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Testimonials Management</h1>
          <p className="text-xs text-slate-500 font-medium">Manage client reviews and endorsements</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 text-white font-bold text-xs shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="rounded-2xl vfx-glass-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-500 uppercase tracking-wider border-b border-slate-200 bg-slate-50/80 font-bold">
              <tr>
                <th className="p-4">Client</th>
                <th className="p-4">Company & Role</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Content</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{item.name}</td>
                  <td className="p-4 text-slate-600">
                    <div>{item.company}</div>
                    <div className="text-[10px] text-slate-400">{item.role}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-slate-900">{item.rating || 5}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 max-w-xs truncate">&quot;{item.content}&quot;</td>
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
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-xl space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Testimonial Content</label>
                <textarea
                  rows={4}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 resize-none shadow-xs"
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
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
