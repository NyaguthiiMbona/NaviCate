// pages/pivot/[role].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import JobList from "@/components/JobList";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { useEffect } from "react";
import { logEvent } from "@/lib/analytics";

const pivotRoles = [
  "accountant",
  "auditor",
  "admin-assistant",
  "secretary",
  "hr-officer",
  "recruiter",
  "paralegal",
  "law-clerk",
  "teacher",
  "customer-service",
  "call-center",
  "cashier",
];

interface PivotPageProps {
  role: string;
}

export default function PivotPage({ role }: PivotPageProps) {
  useEffect(() => {
    // Analytics: page viewed
    (async () => {
      await logEvent("pivot_view", { pivotRole: role });
    })();
  }, [role]);

  return (
    <>
      <Head>
        <title>{`Pivot from ${role} | NaviCate`}</title>
        <meta
          name="description"
          content={`Discover how to pivot from ${role} to future-proof careers with NaviCate. Build resumes and cover letters tailored for your next move.`}
        />
      </Head>

      <main className="max-w-4xl mx-auto py-10 space-y-8">
        <h1 className="text-3xl font-bold text-teal capitalize">
          Pivot from {role.replace("-", " ")}
        </h1>

        <p className="text-gray-700">
          Explore future-proof career options if you’re currently working as a{" "}
          {role.replace("-", " ")}. Build AI-powered resumes and cover letters to
          stand out in your job applications.
        </p>

        {/* Job listing */}
        <JobList role={role} />

        {/* Disclaimer */}
        <DisclaimerBanner />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = pivotRoles.map((role) => ({ params: { role } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { role: params?.role as string } };
};
