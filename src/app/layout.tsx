import type { Metadata } from "next";
import "@/styles/main.scss";
import AuthProvider from "@/providers/AuthProvider/AuthProvider";
import { Vazirmatn } from "next/font/google";
export const metadata: Metadata = {
  title: "Next App",
  description: "Login & Dashboard",
};

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
