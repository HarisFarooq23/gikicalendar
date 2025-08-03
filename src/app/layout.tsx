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
        <div className="absolute top-0 left-0 -z-10">
            <div className="absolute top-[20vh] left-[-5vw] h-[44rem] w-[44rem] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-3xl filter" />
            <div className="absolute top-[10vh] right-[5vw] h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-60 blur-2xl filter" />
            <div className="absolute top-[50vh] left-[25vw] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-50 blur-2xl filter" />
        </div>
        <Header />
        <main className="flex-grow z-10">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
