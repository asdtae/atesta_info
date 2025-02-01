import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
    subsets: ['latin'],
    display: 'swap'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${quicksand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
