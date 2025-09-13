import React, { useState } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{id: string, name: string} | null>(null);

  const handleGoogleLogin = () => {
    // Simulate Google authentication for demo
    setUser({ id: 'demo-user-123', name: 'Demo Student' });
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wellness-blue via-wellness-purple to-wellness-green flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-wellness-blue to-wellness-purple rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">MindMate</h1>
            <p className="text-gray-600 mb-8">Your AI-Powered Student Wellness Companion</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-3">🎤</span>
                <span>Private voice journaling & AI analysis</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-3">👥</span>
                <span>Anonymous peer support groups</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-3">🏆</span>
                <span>Gamified resilience building</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-3">🔒</span>
                <span>Safe, private, and discreet</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-xs text-gray-500 mt-4">
              By continuing, you agree to our terms of service and privacy policy. 
              Your data is encrypted and never shared.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Dashboard userId={user?.id || 'demo-user'} />
    </div>
  );
}

export default App;
