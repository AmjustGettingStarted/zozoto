import type { Metadata } from 'next';
import { fontDisplay, fontBody, fontAccent } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zozoto — Food Delivery App',
  description:
    "Your city's favourite food delivery app. Fresh meals from local kitchens, delivered in minutes.",
  openGraph: {
    title: 'Zozoto — Food Delivery App',
    description:
      "Your city's favourite food delivery app. Fresh meals from local kitchens, delivered in minutes.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%23FF5B2E' d='M16 2C16 2 26 12 26 20C26 25.5 21.5 30 16 30C10.5 30 6 25.5 6 20C6 15 11 9 16 2Z'/%3E%3Cpath fill='%23FFF' d='M16 14C16 14 20 18.5 20 22C20 24.2 18.2 26 16 26C13.8 26 12 24.2 12 22C12 19 14.5 17 16 14Z'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontAccent.variable}`}
    >
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
