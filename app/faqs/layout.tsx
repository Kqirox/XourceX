import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "FAQs",
  description:
    "Find answers to frequently asked questions about XourceX, digital inheritance planning, asset security, and beneficiary management.",
  url: "/faqs",
  keywords: [
    "xourcex faq",
    "inheritance questions",
    "digital asset faq",
    "estate planning help",
    "beneficiary questions",
  ],
});

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
