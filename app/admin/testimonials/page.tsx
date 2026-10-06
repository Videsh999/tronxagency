import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/lib/models/Testimonial";
import TestimonialsClient from "./TestimonialsClient";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  await connectDB();
  const items = await Testimonial.find().sort({ order: 1 }).lean();
  const serialized = JSON.parse(JSON.stringify(items));

  return <TestimonialsClient initialItems={serialized} />;
}
