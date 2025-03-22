import { Search, BookOpen } from 'lucide-react';

export default function PrecedenceFinder() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Precedence Finder</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for legal precedents..."
                className="w-full pl-10 pr-4 py-3 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                Constitutional Law
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                Criminal Law
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                Civil Rights
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                Property Law
              </button>
            </div>

            <div className="mt-8 space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Smith v. Johnson (2024)</h3>
                      <p className="text-sm text-gray-500">Supreme Court • Civil Rights</p>
                    </div>
                    <BookOpen className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mt-2 text-gray-600">
                    Key precedent establishing new guidelines for workplace discrimination cases...
                  </p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      View Full Case
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Save for Later
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Related Cases
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}