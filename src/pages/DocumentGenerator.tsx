import { FileText, Plus } from 'lucide-react';

export default function DocumentGenerator() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Document Generator</h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="h-5 w-5" />
            <span>New Document</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Document Type</h2>
              <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Contract Agreement</option>
                <option>Legal Notice</option>
                <option>Court Filing</option>
                <option>Settlement Agreement</option>
                <option>Power of Attorney</option>
              </select>

              <h2 className="text-xl font-semibold text-gray-900">Document Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Parties Involved</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Key Terms</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-gray-500">Document preview will appear here</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Generate Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}