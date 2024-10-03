import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BlindCoder",
  description: "Coding with Blind. (no see no code)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <div className="body-container">
          <div className="ad">Google Ad 1</div>
          <div className="main-body">{children}</div>
          <div className="ad">Google Ad 2</div>
        </div>
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link href="/" className="logo">BLIND_CODER</Link>
      </div>
      <div className="navbar-links">
        <Link href="/problemSet" className="nav-link">Problem Set</Link>
        <Link href="/rankList" className="nav-link">Rank List</Link>
      </div>
      <div className="auth-links">
        <Link href="/login" className="auth-link">Login</Link>
        <Link href="/signUp" className="auth-link">Sign Up</Link>
      </div>
    </nav>
  );
}