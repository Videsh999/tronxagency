import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
  await connectDB();
  const settings = await SiteSettings.findOne().lean();
  const serialized = settings ? JSON.parse(JSON.stringify(settings)) : null;

  return <SettingsClient initialSettings={serialized} />;
}
