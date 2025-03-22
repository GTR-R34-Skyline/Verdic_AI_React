import { MessageSquare, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useChat } from '../hooks/useChat';

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const { messages, isLoading, sendMessage, clearMessages } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    try {
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-slate-900 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6" />
                <h1 className="text-xl font-semibold">Legal Assistant</h1>
              </div>
              <button
                onClick={clearMessages}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-gray-800">
                        Hello! I'm your AI legal assistant. How can I help you today?
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${
                    msg.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <div
                      className={`rounded-lg p-4 ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white ml-12'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center justify-center">
                  <div className="animate-pulse text-gray-400">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}