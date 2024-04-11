import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getServerSession } from "next-auth/next"
import ProvidersWrapper from "../components/providers-wrapper"
import "../../public/assets/scss/color.scss"

import { authOptions } from "./api/auth/[...nextauth]/auth-options"
import SessionWrapper from "@/components/session-wapper"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: 'width=device-width, initial-scale=1',
}

export const metadata: Metadata = {
  title: "Brainers Chat AI girlfriend",
  description: "Chat with your beautiful AI girlfriend",
  keywords: ["Brainers,AI,Girlfriend"],
  authors: [{ name: "Brainers", url: "https://brain.michelelaurelli.it" }],
  icons: [{ rel: "icon", url: "/favicon.png" }, { rel: "shortcut icon", url: "/favicon.png" }],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <SessionWrapper>
      <html lang="it">
        <body className={inter.className}>
          <ProvidersWrapper userId={session?.user?.email}>
            {children}
          </ProvidersWrapper>
        </body>
      </html>
    </SessionWrapper>
  );
}
