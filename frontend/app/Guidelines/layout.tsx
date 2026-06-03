import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Guidelines",
  description:
    "Read XourceX guidelines including our terms and conditions and code of ethics for secure digital inheritance planning.",
  url: "/Guidelines",
  keywords: [
    "xourcex guidelines",
    "terms and conditions",
    "code of ethics",
    "platform rules",
    "user agreement",
  ],
});

export default function GuidelinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
