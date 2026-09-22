import ServiceDetail from "../../components/ServiceDetail";
import { getSiteContent } from "../../lib/cms";

export const metadata = { title: "Social Media Marketing | GrowPlus+" };

export default async function Page() {
  const { services } = await getSiteContent();
  return <ServiceDetail service={services.find((s) => s.slug === "social")} />;
}
