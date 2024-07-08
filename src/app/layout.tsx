import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <script
          defer
          data-domain='shuyuanchuang.com'
          src='https://shuplausible.zeabur.app/js/script.js'
        ></script>
        <link rel='stylesheet' href='//unpkg.com/heti/umd/heti.min.css'></link>
      </head>
      <body
        className={`${montserrat.variable} ${playFairDisplay.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
