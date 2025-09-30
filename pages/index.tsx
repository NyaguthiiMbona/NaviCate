import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Briefcase, TrendingUp, Users, ArrowRight, Star, Clock, MapPin } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [complexityFilter, setComplexityFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 150 },
    { id: 'tech', name: 'Technology', count: 45 },
    { id: 'finance', name: 'Finance & Banking', count: 32 },
    { id: 'healthcare', name: 'Healthcare', count: 28 },
    { id: 'education', name: 'Education', count: 25 },
    { id: 'marketing', name: 'Marketing & Sales', count: 20 }
  ];

  const complexityLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'simple', name: 'Simple Transition', description: '3-6 months, leverages existing skills' },
    { id: 'moderate', name: 'Moderate Change', description: '6-12 months, requires some new skills' },
    { id: 'complex', name: 'Major Pivot', description: '12+ months, complete career transformation' }
  ];

  const featuredPivots = [
    {
      title: 'Teacher to UX Designer',
      complexity: 'Moderate',
      timeframe: '8-10 months',
      skills: ['Design Thinking', 'Figma', 'User Research'],
      salary: 'KSh 80K - 150K',
      demand: 'High',
      rating: 4.8
    },
    {
      title: 'Accountant to Data Analyst',
      complexity: 'Simple',
      timeframe: '4-6 months',
      skills: ['Excel Advanced', 'SQL', 'Python Basics'],
      salary: 'KSh 70K - 120K',
      demand: 'Very High',
      rating: 4.9
    },
    {
      title: 'Sales Rep to Digital Marketer',
      complexity: 'Simple',
      timeframe: '3-5 months',
      skills: ['Google Ads', 'Social Media', 'Analytics'],
      salary: 'KSh 60K - 100K',
      demand: 'High',
      rating: 4.7
    },
    {
      title: 'Admin to Software Developer',
      complexity: 'Complex',
      timeframe: '12-18 months',
      skills: ['JavaScript', 'React', 'Node.js'],
      salary: 'KSh 100K - 200K',
      demand: 'Very High',
      rating: 4.6
    }
  ];

  const trendingPivots = [
    'Cybersecurity Specialist',
    'Product Manager',
    'DevOps Engineer',
    'Business Analyst',
    'Content Creator'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Navigate Your Perfect Career Pivot
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover data-driven career transitions tailored for the Kenyan job market. 
              From simple skill upgrades to complete career transformations.
            </p>
          </div>

          {/* Advanced Search */}
          <div className="bg-white rounded-xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search career pivots (e.g., 'teacher to tech')"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>

              <select 
                className="py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
                value={complexityFilter}
                onChange={(e) => setComplexityFilter(e.target.value)}
              >
                {complexityLevels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Search size={20} />
              Find My Perfect Pivot
            </button>
          </div>
        </div>
      </div>

      {/* Complexity Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Choose Your Transition Complexity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complexityLevels.slice(1).map((level, index) => (
              <div key={level.id} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    index === 0 ? 'bg-green-500' : 
                    index === 1 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <h3 className="text-xl font-semibold text-gray-900">{level.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{level.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-2" />
                  {index === 0 ? '3-6 months' : index === 1 ? '6-12 months' : '12+ months'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Career Pivots */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Career Pivots</h2>
            <Link href="/pivots" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
              View All Pivots <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPivots.map((pivot, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    pivot.complexity === 'Simple' ? 'bg-green-100 text-green-800' :
                    pivot.complexity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {pivot.complexity}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm text-gray-600 ml-1">{pivot.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{pivot.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={14} className="mr-2" />
                    {pivot.timeframe}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp size={14} className="mr-2" />
                    {pivot.salary}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      pivot.demand === 'Very High' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></span>
                    <span className="text-gray-600">{pivot.demand} Demand</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {pivot.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Explore This Pivot
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Browse Pivots by Industry
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center group border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} pivots</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Pivots */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Trending Career Pivots in Kenya
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {trendingPivots.map((pivot, index) => (
                <Link
                  key={index}
                  href={`/pivot/${pivot.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900 group-hover:text-blue-600">
                    {pivot}
                  </span>
                  <TrendingUp className="text-green-500 group-hover:text-blue-600" size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Career Transformation?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Kenyans who've successfully pivoted their careers with NaviCate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start My Pivot Journey
            </Link>
            <Link
              href="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              I Already Have an Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NaviCate</h3>
              <p className="text-gray-400">
                Your trusted partner for career transformation in Kenya.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/pivots" className="hover:text-white">All Pivots</Link></li>
                <li><Link href="/blog" className="hover:text-white">Career Blog</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-2">Email: hello@navicate.co.ke</p>
              <p className="text-gray-400">Phone: +254 700 000 000</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NaviCate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
