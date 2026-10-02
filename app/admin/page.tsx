import { connectDB } from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import Portfolio from "@/lib/models/Portfolio";
import Testimonial from "@/lib/models/Testimonial";
import FAQ from "@/lib/models/FAQ";
import Lead from "@/lib/models/Lead";
import Link from "next/link";
import {
  Briefcase,
  Layers,
  MessageSquare,
  HelpCircle,
  Users,
  ArrowUpRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  await connectDB();

  const [
    totalServices,
    publishedServices,
    totalPortfolio,
    totalTestimonials,
    totalFAQs,
    totalLeads,
    recentLeads,
  ] = await Promise.all([
    Service.countDocuments(),
    Service.countDocuments({ published: true }),
    Portfolio.countDocuments(),
    Testimonial.countDocuments(),
    FAQ.countDocuments(),
    Lead.countDocuments({ status: "new" }),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
          <span>Executive Dashboard</span>
          <Sparkles className="w-5 h-5 text-cyan-600" />
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Real-time overview of content, client inquiries, and system operations.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Services Card */}
        <div className="rounded-2xl vfx-glass-light p-6 flex items-center justify-between vfx-glass-hover">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Services</span>
            <div className="text-3xl font-black text-slate-900">{totalServices}</div>
            <div className="text-xs text-cyan-700 font-bold">{publishedServices} Published</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-xs">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Portfolio Card */}
        <div className="rounded-2xl vfx-glass-light p-6 flex items-center justify-between vfx-glass-hover">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Portfolio Projects</span>
            <div className="text-3xl font-black text-slate-900">{totalPortfolio}</div>
            <div className="text-xs text-indigo-700 font-bold">Active Case Studies</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* New Leads Card */}
        <div className="rounded-2xl vfx-glass-light p-6 flex items-center justify-between vfx-glass-hover">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Inquiries</span>
            <div className="text-3xl font-black text-emerald-600">{totalLeads}</div>
            <div className="text-xs text-emerald-700 font-bold">Pending Contact</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Testimonials */}
        <div className="rounded-2xl vfx-glass-light p-6 flex items-center justify-between vfx-glass-hover">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Testimonials</span>
            <div className="text-3xl font-black text-slate-900">{totalTestimonials}</div>
            <div className="text-xs text-amber-700 font-bold">Client Reviews</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* FAQs */}
        <div className="rounded-2xl vfx-glass-light p-6 flex items-center justify-between vfx-glass-hover">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">FAQs Managed</span>
            <div className="text-3xl font-black text-slate-900">{totalFAQs}</div>
            <div className="text-xs text-sky-700 font-bold">Published Items</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
            <HelpCircle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Leads Table */}
      <div className="rounded-2xl vfx-glass-light p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Recent Client Enquiries</span>
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {recentLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-500 uppercase tracking-wider border-b border-slate-200 bg-slate-50/80">
                <tr>
                  <th className="p-3 font-bold">Client Name</th>
                  <th className="p-3 font-bold">Email / Phone</th>
                  <th className="p-3 font-bold">Service Interested</th>
                  <th className="p-3 font-bold">Date</th>
                  <th className="p-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <tr key={lead._id.toString()} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900">
                      {lead.name}
                      {lead.businessName && (
                        <div className="text-[10px] text-slate-500 font-normal">{lead.businessName}</div>
                      )}
                    </td>
                    <td className="p-3 text-slate-600">
                      <div>{lead.email}</div>
                      <div className="text-slate-400">{lead.phone}</div>
                    </td>
                    <td className="p-3 text-cyan-700 font-bold">
                      {lead.serviceInterested || "General Inquiry"}
                    </td>
                    <td className="p-3 text-slate-500 font-mono">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          lead.status === "new"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : lead.status === "contacted"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            No client enquiries submitted yet.
          </div>
        )}
      </div>
    </div>
  );
}
