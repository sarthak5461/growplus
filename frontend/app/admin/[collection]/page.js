import { notFound } from "next/navigation";
import CollectionEditor from "../../../components/admin/CollectionEditor";
import { FIELDS, TITLES } from "../../../lib/adminFields";

export default async function CollectionPage({ params }) {
  const { collection } = await params;
  if (!FIELDS[collection]) notFound();
  return <CollectionEditor collection={collection} title={TITLES[collection]} />;
}
