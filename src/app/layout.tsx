import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Campus Events Calendar',
  description: 'Your central hub for all university society and club events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background flex flex-col relative">
        <div 
          className="absolute top-0 left-0 -z-10 h-full w-full" 
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 90% -10%, rgba(22, 22, 59, 0.5), transparent 50%), #0D0D1A',
          }}
        />
        <Header />
        <main className="flex-grow z-10">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
