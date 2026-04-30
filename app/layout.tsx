import type { Metadata } from 'next';
import { Kiwi_Maru, Zen_Maru_Gothic } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './providers/AuthProvider';

const kiwiMaru = Kiwi_Maru({
  variable: '--font-kiwi-maru',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: '--font-zen-maru-gothic',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Seat Tree -配慮できる席替えアプリ-',
  description:
    '配慮が必要な生徒関係も考えながら、ワンクリックで席替え。名簿管理・履歴保存・印刷までできる、先生の負担を減らす席替え支援アプリ。',
  metadataBase: new URL('https://change-seats-app.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.webp',
    apple: '/apple-icon.webp',
  },
  openGraph: {
    siteName: 'Seat Tree',
    title: 'Seat Tree -配慮できる席替えアプリ-',
    description:
      '配慮が必要な生徒関係も考えながら、ワンクリックで席替え。名簿管理・履歴保存・印刷までできる、先生の負担を減らす席替え支援アプリ。',
    type: 'website',
    url: 'https://change-seats-app.vercel.app',
    locale: 'ja_JP',
    images: [
      {
        url: '/OGP_seat-tree.webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Rio_Taro117',
    creator: '@Rio_Taro117',
    title: 'Seat Tree -配慮できる席替えアプリ-',
    description:
      '配慮が必要な生徒関係も考えながら、ワンクリックで席替え。名簿管理・履歴保存・印刷までできる、先生の負担を減らす席替え支援アプリ。',
    images: ['/OGP_seat-tree.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${kiwiMaru.variable} ${zenMaruGothic.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#dec29a" />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
