// Updated pages/pivot/[role].tsx with 80 comprehensive job roles
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import JobList from "@/components/JobList";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { useEffect } from "react";
import { logEvent } from "@/lib/analytics";

// Comprehensive list of 80 pivot-ready job roles
const pivotRoles = [
  // Administrative & Office Support (10 roles)
  "accountant",
  "auditor", 
  "admin-assistant",
  "secretary",
  "office-manager",
  "bookkeeper",
  "data-entry-clerk",
  "receptionist",
  "executive-assistant",
  "payroll-specialist",

  // Human Resources & Recruitment (8 roles)
  "hr-officer",
  "recruiter",
  "hr-assistant",
  "training-coordinator",
  "benefits-administrator",
  "talent-acquisition",
  "hr-generalist",
  "employee-relations",

  // Legal & Compliance (6 roles)
  "paralegal",
  "law-clerk",
  "legal-assistant",
  "compliance-officer",
  "contract-administrator",
  "legal-secretary",

  // Education & Training (8 roles)
  "teacher",
  "tutor",
  "training-specialist",
  "instructional-designer",
  "academic-advisor",
  "librarian",
  "education-coordinator",
  "curriculum-developer",

  // Customer Service & Sales (10 roles)
  "customer-service",
  "call-center",
  "sales-representative",
  "account-manager",
  "customer-success",
  "sales-coordinator",
  "business-development",
  "retail-manager",
  "sales-assistant",
  "client-relations",

  // Finance & Banking (8 roles)
  "bank-teller",
  "financial-analyst",
  "loan-officer",
  "investment-advisor",
  "credit-analyst",
  "tax-preparer",
  "budget-analyst",
  "financial-planner",

  // Healthcare & Social Services (8 roles)
  "nurse",
  "medical-assistant",
  "social-worker",
  "healthcare-admin",
  "pharmacy-tech",
  "medical-secretary",
  "patient-coordinator",
  "health-educator",

  // Technology & IT Support (6 roles)
  "it-support",
  "help-desk",
  "data-analyst",
  "system-admin",
  "network-tech",
  "software-tester",

  // Marketing & Communications (6 roles)
  "marketing-assistant",
  "content-writer",
  "social-media",
  "graphic-designer",
  "pr-coordinator",
  "brand-manager",

  // Operations & Supply Chain (5 roles)
  "operations-manager",
  "supply-chain",
  "logistics-coordinator",
  "procurement",
  "inventory-manager",

  // Retail & Hospitality (5 roles)
  "cashier",
  "store-manager",
  "hotel-manager",
  "restaurant-manager",
  "event-coordinator",
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

  // Format role name for display
  const formatRoleName = (role: string) => {
    return role
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <Head>
        <title>{`Pivot from ${formatRoleName(role)} | NaviCate`}</title>
        <meta
          name="description"
          content={`Discover future-proof career opportunities for ${formatRoleName(role)} professionals. Get AI-powered resumes and career transition guidance in Kenya.`}
        />
        <meta name="keywords" content={`career change ${role}, ${role} pivot Kenya, career transition, job opportunities`} />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pivot from {formatRoleName(role)}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore future-proof career options if you're currently working as a{" "}
              {formatRoleName(role).toLowerCase()}. Build AI-powered resumes and cover letters to
              stand out in your job applications.
            </p>
          </div>

          {/* Job listing */}
          <JobList role={role} />
          
          {/* Disclaimer */}
          <DisclaimerBanner />
        </div>
      </div>
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
