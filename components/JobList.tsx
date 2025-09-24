// components/JobList.tsx
import { useState } from "react";
import { logEvent } from "@/lib/analytics";
interface JobListProps { role: string; }

const jobData: Record<string, { title: string; link: string }[]> = {
  accountant: [
    { title: "ESG Reporting Specialist", link: "https://example.com/job/esg" },
    { title: "Finance Transformation Analyst", link: "https://example.com/job/finance" },
    { title: "Risk & Compliance Consultant", link: "https://example.com/job/risk" },
  ],
  "hr-officer": [
    { title: "HR Tech Systems Manager", link: "https://example.com/job/hrtech" },
    { title: "People Analytics Specialist", link: "https://example.com/job/analytics" },
    { title: "Diversity & Inclusion Lead", link: "https://example.com/job/diversity" },
  ],
  teacher: [
    { title: "EdTech Curriculum Designer", link: "https://example.com/job/edtech" },
    { title: "Learning Experience Designer", link: "https://example.com/job/learning" },
    { title: "Online Course Developer", link: "https://example.com/job/course" },
  ],
};

export default function JobList({ role }: JobListProps) {
  const [visibleCount, setVisibleCount] = useState(2);

  const jobs = jobData[role as keyof typeof jobData] || [];

  if (jobs.length === 0) {
    return <p className="text-gray-600">No job pivots found for this role yet.</p>;
  }

  const handleJobClick = async (job: { title: string; link: string }) => {
    await logEvent("job_click", { pivotRole: role, jobTitle: job.title, jobLink: job.link });
    // Let the link open normally (we're not preventing navigation)
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-teal">Job Opportunities</h2>
      <ul className="space-y-3">
        {jobs.slice(0, visibleCount).map((job, idx) => (
          <li key={idx}>
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleJobClick(job)}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              {job.title}
            </a>
          </li>
        ))}
      </ul>

      {visibleCount < jobs.length && (
        <button
          onClick={() => setVisibleCount(visibleCount + 2)}
          className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-dark transition"
        >
          Load More
        </button>
      )}
    </div>
  );
}
