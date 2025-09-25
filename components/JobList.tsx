// Updated components/JobList.tsx - Uses the comprehensive job opportunities database
import { jobOpportunities } from '@/lib/jobOpportunities';

interface JobListProps {
  role: string;
}

export default function JobList({ role }: JobListProps) {
  const jobs = jobOpportunities[role] || [];

  if (jobs.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">🚧 Coming Soon!</h3>
        <p className="text-yellow-700">
          We're currently developing career pivot opportunities for {role.replace('-', ' ')} professionals. 
          Check back soon or <a href="mailto:hello@navicate.co.ke" className="underline">contact us</a> for personalized guidance.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Recommended Career Opportunities</h2>
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {jobs.map((job, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                +{job.growthPotential}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{job.description}</p>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-2">💰 Salary Range</h4>
                <p className="text-gray-700 text-sm">{job.salaryRange}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-2">🎯 Your Transferable Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.transferableSkills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-2">📍 Location</h4>
                <p className="text-gray-700 text-sm">{job.location}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                🚀 Get AI-Powered Resume for This Role
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Make the Switch? 🎯</h3>
          <p className="text-gray-700 mb-4">
            Get personalized career transition guidance and AI-powered application materials.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
            Start Your Career Transformation
          </button>
        </div>
      </div>
    </div>
  );
}
