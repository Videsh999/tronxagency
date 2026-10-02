"use client";

import { Menu, Shield, User } from "lucide-react";

export default function AdminHeader({
  onMenuClick,
  adminName = "Administrator",
  adminRole = "superadmin",
}: {
  onMenuClick: () => void;
  adminName?: string;
  adminRole?: string;
}) {
  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="text-xs font-mono font-bold text-slate-500 hidden sm:block">
          TRONX AI Management Portal v2.0
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-300/60 text-[11px] font-bold text-cyan-800 uppercase tracking-wider">
          <Shield className="w-3 h-3 text-cyan-600" />
          <span>{adminRole}</span>
        </div>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-cyan-600 shadow-xs">
            <User className="w-4 h-4 text-cyan-600" />
          </div>
          <span className="text-xs font-bold text-slate-900 hidden sm:block">
            {adminName}
          </span>
        </div>
      </div>
    </header>
  );
}
