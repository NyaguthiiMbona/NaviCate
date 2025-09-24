import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog – NaviCate</title>
      </Head>

      <Navbar />

      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-teal mb-6">Blog</h1>
        <p className="text-gray-700">Coming soon…</p>
      </section>

      <Footer />
    </>
  );
}
