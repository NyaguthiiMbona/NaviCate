import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>NaviCate – Pivot Your Career</title>
        <meta
          name="description"
          content="AI-powered resumes and career pivots for the future of work."
        />
      </Head>

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-bold text-teal mb-6">
          Pivot Your Career with Confidence
        </h1>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl">
          NaviCate helps you transition into future-proof careers with AI-crafted
          resumes, cover letters, and role insights.
        </p>

        <div className="space-x-4">
          <Link
            href="/pivot/teacher-to-edtech-designer"
            className="bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Find Your Pivot
          </Link>
          <Link
            href="#"
            className="bg-white border border-teal text-teal px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Generate Resume
          </Link>
          <Link
            href="#"
            className="bg-white border border-teal text-teal px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Explore Roles
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
