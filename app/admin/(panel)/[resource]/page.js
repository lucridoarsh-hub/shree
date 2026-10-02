import { notFound } from "next/navigation";
import ResourceManager from "@/components/admin/ResourceManager";
import { resources } from "@/lib/schema";

export default async function ResourcePage({ params }) {
  const { resource } = await params;
  if (!Object.hasOwn(resources, resource)) notFound();
  return <ResourceManager key={resource} resource={resource} />;
}
