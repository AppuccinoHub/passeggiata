import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WalkPlayer } from "@/components/walk-player";
import { getStroll, strolls } from "@/lib/curriculum";

export function generateStaticParams() {
  return strolls.map((stroll) => ({ slug: stroll.slug }));
}

type StrollParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: StrollParams): Promise<Metadata> {
  const { slug } = await params;
  const stroll = getStroll(slug);
  if (!stroll) return { title: "Passeggiata" };
  return {
    title: stroll.title,
    description: stroll.skill,
  };
}

export default async function StrollPage({ params }: StrollParams) {
  const { slug } = await params;
  const stroll = getStroll(slug);
  if (!stroll) notFound();
  return <WalkPlayer slug={stroll.slug} />;
}
