import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";

export const metadata: Metadata = {
  title: "Quotify — 오늘의 명언",
  description: "매일 새로운 영감을 주는 오늘의 명언",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Sidebar />
        <div className="page-wrap">{children}</div>
      </body>
    </html>
  );
}
