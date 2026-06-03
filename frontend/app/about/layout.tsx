import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "About Us",
  description:
    "Learn about XourceX - a blockchain-powered platform dedicated to redefining how digital assets are secured and passed down through generations.",
  url: "/about",
  keywords: [
    "about xourcex",
    "blockchain inheritance",
    "digital estate planning",
    "crypto inheritance platform",
    "secure asset transfer",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
