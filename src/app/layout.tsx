import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

const playFairDisplay = Playfair_Display({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playFairDisplay',
});

export const metadata: Metadata = {
  title: 'Shuyuan Chuang',
  description: 'All about Shuyuan Chuang.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.variable} ${playFairDisplay.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
