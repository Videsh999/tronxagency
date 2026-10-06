import { connectDB } from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  await connectDB();
  const services = await Service.find().sort({ order: 1 }).lean();

  // Convert MongoDB ObjectId to string for client component prop serialization
  const serializedServices = JSON.parse(JSON.stringify(services));

  return <ServicesClient initialServices={serializedServices} />;
}
