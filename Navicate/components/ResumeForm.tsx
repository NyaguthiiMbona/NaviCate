import { useState } from "react";

interface ResumeFormProps {
  onGenerate: (data: {
    name: string;
    email: string;
    role: string;
    skills: string[];
    style: string;
  }) => void;
}

export default function ResumeForm({ onGenerate }: ResumeFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [style, setStyle] = useState("classic");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillArray = skills.split(",").map((s) => s.trim());
    onGenerate({ name, email, role, skills: skillArray, style });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold text-teal">Build Your Resume</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal"
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal"
        required
      />

      <input
        type="text"
        placeholder="Target Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal"
        required
      />

      <input
        type="text"
        placeholder="Key Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal"
      />

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal"
      >
        <option value="classic">Classic</option>
        <option value="modern">Modern</option>
        <option value="creative">Creative</option>
      </select>

      <button
        type="submit"
        className="w-full bg-teal text-white py-2 rounded-lg hover:bg-teal-dark transition"
      >
        Generate Resume
      </button>
    </form>
  );
}
