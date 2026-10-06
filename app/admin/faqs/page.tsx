import { connectDB } from "@/lib/mongodb";
import FAQ from "@/lib/models/FAQ";
import FaqsClient from "./FaqsClient";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  await connectDB();
  const items = await FAQ.find().sort({ order: 1 }).lean();
  const serialized = JSON.parse(JSON.stringify(items));

  return <FaqsClient initialItems={serialized} />;
}
