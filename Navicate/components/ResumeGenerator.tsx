// components/ResumeGenerator.tsx
import { useState } from "react";
import ResumeForm from "./ResumeForm";
import { useAuth } from "@/context/AuthContext";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { logEvent } from "@/lib/analytics";

interface ResumeData {
  name: string;
  email: string;
  role: string;
  skills: string[];
  style: string;
}

export default function ResumeGenerator() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const { user } = useAuth(); // user?.email available

  const handleGenerate = async (data: ResumeData) => {
    setResumeData(data);

    // Analytics: user generated a resume
    await logEvent("generate", {
      userEmail: user?.email ?? data.email ?? null,
      pivotRole: data.role,
    });
  };

  const exportWord = async () => {
    if (!resumeData) return;

    const content = `
${resumeData.name}
Email: ${resumeData.email}

Target Role: ${resumeData.role}

Skills:
${resumeData.skills.join(", ")}

Experience:
- Placeholder experience

Education:
- Placeholder education

---

Cover Letter
Dear Hiring Manager,
I am writing to apply for the role of ${resumeData.role}. My skills in ${resumeData.skills.join(
      ", "
    )} make me a strong candidate. I am eager to contribute and grow with your organization.

Sincerely,
${resumeData.name}
`;

    const blob = new Blob([content], {
      type: "application/msword;charset=utf-8",
    });
    saveAs(blob, `${resumeData.name}_resume.docx`);

    // Analytics: download Word
    await logEvent("download_word", {
      userEmail: user?.email ?? resumeData.email ?? null,
      pivotRole: resumeData.role,
    });
  };

  const exportPDF = async () => {
    if (!resumeData) return;

    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`${resumeData.name}`, 10, 10);
    doc.text(`Email: ${resumeData.email}`, 10, 20);
    doc.text(`Target Role: ${resumeData.role}`, 10, 30);

    doc.text("Skills:", 10, 40);
    resumeData.skills.forEach((skill, i) => {
      doc.text(`- ${skill}`, 15, 50 + i * 10);
    });

    doc.text("Experience:", 10, 80);
    doc.text("- Placeholder experience", 15, 90);
    doc.text("Education:", 10, 110);
    doc.text("- Placeholder education", 15, 120);

    doc.addPage();
    doc.text("Cover Letter", 10, 10);
    doc.text(
      `Dear Hiring Manager,\n\nI am writing to apply for the role of ${resumeData.role}. 
My skills in ${resumeData.skills.join(
        ", "
      )} make me a strong candidate. I am eager to contribute and grow with your organization.\n\nSincerely,\n${
        resumeData.name
      }`,
      10,
      20
    );

    doc.save(`${resumeData.name}_resume.pdf`);

    // Analytics: download PDF
    await logEvent("download_pdf", {
      userEmail: user?.email ?? resumeData.email ?? null,
      pivotRole: resumeData.role,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-10">
      <ResumeForm onGenerate={handleGenerate} />

      {resumeData && (
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          {/* Resume Preview */}
          <div>
            <h3 className="text-xl font-bold text-teal mb-4">Resume Preview</h3>
            <div className="border p-4 rounded-lg space-y-4">
              <header>
                <h2 className="text-2xl font-bold">{resumeData.name}</h2>
                <p className="text-gray-600">{resumeData.email}</p>
              </header>

              <section>
                <h4 className="font-semibold text-teal">Target Role</h4>
                <p>{resumeData.role}</p>
              </section>

              <section>
                <h4 className="font-semibold text-teal">Skills</h4>
                <ul className="list-disc list-inside">
                  {resumeData.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-teal">Experience</h4>
                <p className="text-sm text-gray-700 italic">
                  Placeholder experience – replace with real achievements
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-teal">Education</h4>
                <p className="text-sm text-gray-700 italic">
                  Placeholder education – replace with real credentials
                </p>
              </section>
            </div>
          </div>

          {/* Cover Letter Preview */}
          <div>
            <h3 className="text-xl font-bold text-teal mb-4">
              Cover Letter Preview
            </h3>
            <div className="border p-4 rounded-lg space-y-3">
              <p>Dear Hiring Manager,</p>
              <p>
                I am writing to apply for the role of <strong>{resumeData.role}</strong>.
                My skills in {resumeData.skills.join(", ")} make me a strong candidate.
                I am eager to contribute and grow with your organization.
              </p>
              <p>Sincerely,</p>
              <p>{resumeData.name}</p>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={exportWord}
              className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-dark transition"
            >
              Download Word
            </button>

            <button
              onClick={exportPDF}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
