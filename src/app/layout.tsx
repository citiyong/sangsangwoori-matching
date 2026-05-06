import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "상상우리 — 시니어 일자리 매칭",
  description: "시니어와 일자리를 연결하는 자동 매칭 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <nav className="bg-blue-700 text-white shadow-lg">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight hover:opacity-90"
            >
              상상우리
            </Link>
            <div className="flex gap-3 sm:ml-auto">
              <Link
                href="/register"
                className="text-lg font-semibold px-4 py-2 rounded-lg bg-white text-blue-700 hover:bg-blue-50 transition-colors"
              >
                프로필 등록
              </Link>
              <Link
                href="/recommendations"
                className="text-lg font-semibold px-4 py-2 rounded-lg bg-white text-blue-700 hover:bg-blue-50 transition-colors"
              >
                매칭 추천
              </Link>
              <Link
                href="/admin"
                className="text-lg font-semibold px-4 py-2 rounded-lg bg-white text-blue-700 hover:bg-blue-50 transition-colors"
              >
                담당자
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
