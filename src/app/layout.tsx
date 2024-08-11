import type { Metadata } from "next";
import { Rubik, Radley, Roboto_Condensed, Poppins } from "next/font/google";
import "./globals.css";
import HeaderNavBar from "@/components/header-navbar";
import { Providers } from "./providers";

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
})

const radley = Radley({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-radley',
})

const roboto = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '300'],
  variable: '--font-roboto',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '300'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "Panbo Daily Tasks",
  description: "Keep up to date on the actions and happenings of Panbo founders, daily.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${rubik.variable} 
      ${radley.variable} 
      ${roboto.variable} 
      ${poppins.variable}
       bg-base`}
      >
        <Providers>
          <HeaderNavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
