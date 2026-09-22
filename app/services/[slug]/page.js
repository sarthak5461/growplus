import { notFound } from "next/navigation";
import ServiceDetail from "../../../components/ServiceDetail";
import { getServiceBySlug } from "../../../lib/services/services";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return { title: service ? `${service.short || service.title} | GrowPlus+` : "Service | GrowPlus+" };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  return <ServiceDetail service={{ ...service, summary: service.summary || service.shortDescription, tags: service.tags || [] }} />;
}
