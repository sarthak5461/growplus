import SiteShell from "../components/Chrome";
import { getSiteContent } from "../lib/cms";
import "./globals.css";

export const metadata = {
  title: "GrowPlus+ | Elite Digital Marketing Agency",
  description: "India's elite digital marketing agency. SEO, performance, social, brand, influencer, and content marketing built for measurable growth.",
};

export default async function RootLayout({ children }) {
  const content = await getSiteContent();
  return (
    <html lang="en">
      <body>
        <SiteShell content={content}>{children}</SiteShell>
      </body>
    </html>
  );
}
