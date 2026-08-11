import { apparel, getApparelBySlug } from "@/lib/apparel";
import { notFound } from "next/navigation";
import ApparelDetailClient from "./ApparelDetailClient";

export function generateStaticParams() {
  return apparel.map((p) => ({ slug: p.slug }));
}

export default function ApparelDetailPage({ params }) {
  const product = getApparelBySlug(params.slug);
  if (!product) return notFound();

  return <ApparelDetailClient product={product} />;
}
