import { Menu, Scale, Home, FileText, Search, MessageSquare, ClipboardList, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Document Generator', path: '/document-generator', icon: FileText },
    { name: 'Precedence Finder', path: '/precedence-finder', icon: Search },
    { name: 'Chatbot', path: '/chatbot', icon: MessageSquare },
    { name: 'Backlog Management', path: '/backlog', icon: ClipboardList },
  ];

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-semibold">Verdic AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-800 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800 transition-colors w-full"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}