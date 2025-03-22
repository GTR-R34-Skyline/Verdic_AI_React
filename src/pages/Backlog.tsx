import { ClipboardList, Plus, Filter } from 'lucide-react';

export default function Backlog() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Case Management</h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="h-5 w-5" />
            <span>New Case</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>All Cases</option>
                  <option>Active Cases</option>
                  <option>Pending Review</option>
                  <option>Closed Cases</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cases..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <ClipboardList className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #2024-{item.toString().padStart(4, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      John Smith
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Civil Litigation
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Mar 15, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing 1 to 5 of 42 cases
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}