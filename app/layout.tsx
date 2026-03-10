import type {Metadata} from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Aura Tarot | Portal Místico',
  description: 'Descubra seu destino com leituras de tarot guiadas por IA.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#0a0502] text-[#f5f2ed] antialiased selection:bg-[#ff4e00]/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
