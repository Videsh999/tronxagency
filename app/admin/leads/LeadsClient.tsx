"use client";

import { useState } from "react";
import { Search, Trash2, Mail, Phone, Building, Calendar, CheckCircle2 } from "lucide-react";

export interface LeadData {
  _id: string;
  name: string;
  phone: string;
  email: string;
  businessName?: string;
  serviceInterested?: string;
  projectDescription?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export default function LeadsClient({ initialLeads }: { initialLeads: LeadData[] }) {
  const [leads, setLeads] = useState<LeadData[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setLeads(leads.map((l) => (l._id === id ? { ...l, status: newStatus as LeadData["status"] } : l)));
      } else {
        alert(json.error || "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating lead status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead inquiry?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (res.ok && json.success) {
        setLeads(leads.filter((l) => l._id !== id));
      } else {
        alert(json.error || "Failed to delete lead.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting lead.");
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (l.businessName && l.businessName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Leads & Client Inquiries</h1>
          <p className="text-xs text-slate-500 font-medium">Track and manage prospect submissions</p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 shadow-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 shadow-xs font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div
              key={lead._id}
              className="rounded-2xl vfx-glass-light p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 vfx-glass-hover"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-extrabold text-slate-900">{lead.name}</h3>
                  {lead.businessName && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-bold">
                      <Building className="w-3 h-3 text-cyan-600" />
                      {lead.businessName}
                    </span>
                  )}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      lead.status === "new"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : lead.status === "contacted"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Mail className="w-3.5 h-3.5 text-cyan-600" />
                    {lead.email}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Phone className="w-3.5 h-3.5 text-indigo-600" />
                    {lead.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(lead.createdAt).toLocaleString()}
                  </span>
                </div>

                {lead.serviceInterested && (
                  <div className="text-xs text-cyan-700 font-bold pt-1">
                    Interested in: <span className="text-slate-900 font-extrabold">{lead.serviceInterested}</span>
                  </div>
                )}

                {lead.projectDescription && (
                  <p className="text-xs text-slate-600 bg-white/70 border border-slate-200 p-3 rounded-xl mt-2 leading-relaxed">
                    {lead.projectDescription}
                  </p>
                )}
              </div>

              {/* Status Update & Actions */}
              <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-200">
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 font-bold shadow-xs"
                >
                  <option value="new">Mark New</option>
                  <option value="contacted">Mark Contacted</option>
                  <option value="closed">Mark Closed</option>
                </select>

                <button
                  onClick={() => handleDelete(lead._id)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-colors border border-slate-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-slate-500 bg-white/60 rounded-2xl border border-slate-200">
            No client inquiries found matching search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
