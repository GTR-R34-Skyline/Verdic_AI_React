import { Scale, FileText, Search, MessageSquare, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      name: 'Document Generator',
      description: 'Generate legal documents with AI assistance',
      icon: FileText,
      path: '/document-generator'
    },
    {
      name: 'Precedence Finder',
      description: 'Search and analyze legal precedents',
      icon: Search,
      path: '/precedence-finder'
    },
    {
      name: 'Legal Assistant',
      description: 'AI-powered legal research chatbot',
      icon: MessageSquare,
      path: '/chatbot'
    },
    {
      name: 'Case Management',
      description: 'Organize and track your legal cases',
      icon: ClipboardList,
      path: '/backlog'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-slate-900 py-24 sm:py-32"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Scale className="h-16 w-16 text-blue-400 mx-auto mb-8" />
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Verdic AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Empowering legal professionals with advanced AI tools for document generation,
              precedent research, and case management.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Legal AI Solutions
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Streamline your legal practice with our comprehensive suite of AI-powered tools.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={feature.name}
                    to={feature.path}
                    className="relative flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-center text-gray-600">
                      {feature.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}