import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/providers";
import { SITE_INFO } from "@/config/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: SITE_INFO.name,
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  metadataBase: new URL(SITE_INFO.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_INFO.url,
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    siteName: SITE_INFO.name,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    images: [SITE_INFO.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistMono.variable} font-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
