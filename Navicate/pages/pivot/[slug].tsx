import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function PivotPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>Career Pivot – {slug}</title>
        <meta
          name="description"
          content="Explore how your current role can pivot into a future-proof career."
        />
      </Head>

      <Navbar />

      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-teal mb-4">
          Teacher → EdTech Designer
        </h1>
        <p className="text-gray-700 mb-8">
          As AI tutoring grows, traditional teaching roles are evolving into EdTech
          curriculum design. This pivot leverages your expertise while making you
          future-proof.
        </p>

        <div className="space-x-4">
          <button className="bg-teal text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-dark transition">
            Generate Resume
          </button>
          <button className="bg-white border border-teal text-teal px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
            Generate Cover Letter
          </button>
          <button className="bg-white border border-teal text-teal px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
            See Jobs
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          Disclaimer: NaviCate does not guarantee job placement. Use this as guidance only.
        </p>
      </section>

      <Footer />
    </>
  );
}
