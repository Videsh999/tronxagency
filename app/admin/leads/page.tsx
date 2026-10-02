import { connectDB } from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import LeadsClient from "./LeadsClient";

export default async function AdminLeadsPage() {
  await connectDB();
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  const serialized = JSON.parse(JSON.stringify(leads));

  return <LeadsClient initialLeads={serialized} />;
}
