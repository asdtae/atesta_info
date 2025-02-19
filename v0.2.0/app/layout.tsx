import Navbar from './ui/navbar'
import Footer from './ui/footer'
import "./globals.css";
import React from "react";
import { SessionClient } from "./sessionclient.tsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <title>Cyclesphere</title>
      </head>
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
