import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";  // 👈 import

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>NaviCate</title>
        <meta
          name="description"
          content="Pivot your career with AI-powered resumes and cover letters."
        />
      </Head>
      <main className="font-sans bg-gray-50 text-gray-900 min-h-screen">
        <Navbar />   {/* 👈 add here */}
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
