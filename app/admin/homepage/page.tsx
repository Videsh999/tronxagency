import { connectDB } from "@/lib/mongodb";
import Homepage from "@/lib/models/Homepage";
import HomepageClient from "./HomepageClient";

export default async function AdminHomepageEditorPage() {
  await connectDB();
  const homepage = await Homepage.findOne().lean();
  const serialized = homepage ? JSON.parse(JSON.stringify(homepage)) : null;

  return <HomepageClient initialData={serialized} />;
}
