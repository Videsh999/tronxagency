import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";
import AdminPortfolioClient from "./PortfolioClient";

export default async function AdminPortfolioPage() {
  await connectDB();
  const items = await Portfolio.find().sort({ order: 1 }).lean();
  const serialized = JSON.parse(JSON.stringify(items));

  return <AdminPortfolioClient initialItems={serialized} />;
}
