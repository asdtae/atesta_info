import Navbar from './ui/navbar'
import Footer from './ui/footer'
import "./globals.css";
import React from "react";
import { SessionClient } from "./sessionclient.tsx";

export const metadata = {
    title: 'Cyclesphere',
    description: 'Your cycling community platform',
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionClient>
            <Navbar />
            {children}
            <Footer />
        </SessionClient>
      </body>
    </html>
  );
}
