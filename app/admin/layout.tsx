import { redirect } from "next/navigation";
import { getAuthAdmin } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthAdmin();

  return (
    <AdminLayoutClient adminUser={admin}>
      {children}
    </AdminLayoutClient>
  );
}
