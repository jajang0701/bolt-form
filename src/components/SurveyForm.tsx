import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface SurveyFormProps {
  userEmail: string;
  onLogout: () => void;
}

const questions = [
  {
    id: 1,
    question: 'What is your primary role in the technology industry?',
    type: 'select',
    options: [
      'Software Engineer/Developer',
      'Data Scientist/ML Engineer',
      'Product Manager',
      'CTO/Technical Leadership',
      'Researcher',
      'Designer',
      'Other',
    ],
  },
  {
    id: 2,
    question: 'How many years of professional experience do you have?',
    type: 'select',
    options: ['0-2 years', '3-5 years', '6-10 years', '11-15 years', '15+ years'],
  },
  {
    id: 3,
    question: 'How frequently do you use AI tools in your daily work?',
    type: 'select',
    options: ['Daily', 'Several times a week', 'Weekly', 'Monthly', 'Rarely', 'Never'],
  },
  {
    id: 4,
    question: 'Which AI tools or platforms do you use most frequently? (Select all that apply)',
    type: 'multiselect',
    options: ['ChatGPT', 'GitHub Copilot', 'Claude', 'Gemini', 'Midjourney/DALL-E', 'Custom AI models', 'None'],
  },
  {
    id: 5,
    question: 'What is your primary use case for AI in your work?',
    type: 'select',
    options: [
      'Code generation and assistance',
      'Content creation',
      'Data analysis',
      'Automation',
      'Research',
      'Problem-solving',
      'Other',
    ],
  },
  {
    id: 6,
    question: 'How would you rate your understanding of AI and machine learning concepts?',
    type: 'select',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  },
  {
    id: 7,
    question: 'Do you believe AI will replace jobs in your field within the next 5 years?',
    type: 'select',
    options: ['Definitely yes', 'Probably yes', 'Unsure', 'Probably no', 'Definitely no'],
  },
  {
    id: 8,
    question: 'How concerned are you about AI ethics and safety?',
    type: 'select',
    options: ['Very concerned', 'Somewhat concerned', 'Neutral', 'Not very concerned', 'Not concerned at all'],
  },
  {
    id: 9,
    question: 'Has AI increased your productivity at work?',
    type: 'select',
    options: ['Significantly increased', 'Moderately increased', 'Slightly increased', 'No change', 'Decreased'],
  },
  {
    id: 10,
    question: 'What percentage of your work tasks could potentially be automated by AI?',
    type: 'select',
    options: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
  },
  {
    id: 11,
    question: 'How do you feel about the current pace of AI development?',
    type: 'select',
    options: ['Too fast', 'About right', 'Too slow', 'Uncertain'],
  },
  {
    id: 12,
    question: 'What is your biggest concern about AI technology?',
    type: 'select',
    options: [
      'Job displacement',
      'Privacy concerns',
      'Bias and fairness',
      'Security risks',
      'Loss of human control',
      'Environmental impact',
      'No major concerns',
    ],
  },
  {
    id: 13,
    question: 'Do you think AI regulation is necessary?',
    type: 'select',
    options: ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'],
  },
  {
    id: 14,
    question: 'How confident are you in AI-generated code or content?',
    type: 'select',
    options: ['Very confident', 'Confident', 'Somewhat confident', 'Not very confident', 'Not confident at all'],
  },
  {
    id: 15,
    question: 'What AI capability would be most valuable for your work?',
    type: 'select',
    options: [
      'Better code understanding',
      'Improved reasoning abilities',
      'Faster processing',
      'Better natural language understanding',
      'More accurate predictions',
      'Creative capabilities',
    ],
  },
  {
    id: 16,
    question: 'How often does your organization discuss AI strategy?',
    type: 'select',
    options: ['Weekly', 'Monthly', 'Quarterly', 'Annually', 'Rarely', 'Never'],
  },
  {
    id: 17,
    question: 'What is your organization\'s stance on AI adoption?',
    type: 'select',
    options: [
      'Actively investing',
      'Exploring opportunities',
      'Cautiously observing',
      'Resistant to adoption',
      'No clear stance',
    ],
  },
  {
    id: 18,
    question: 'Have you received formal training in AI or machine learning?',
    type: 'select',
    options: ['Yes, extensive training', 'Yes, some training', 'Self-taught', 'No, but interested', 'No training'],
  },
  {
    id: 19,
    question: 'What do you think will be the most transformative AI application in the next 3 years?',
    type: 'text',
    placeholder: 'Share your thoughts...',
  },
  {
    id: 20,
    question: 'Any additional comments or insights about AI and technology?',
    type: 'textarea',
    placeholder: 'Optional: Share your thoughts...',
  },
];

export default function SurveyForm({ userEmail, onLogout }: SurveyFormProps) {
  const [responses, setResponses] = useState<Record<number, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSelectChange = (questionId: number, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleMultiSelectChange = (questionId: number, option: string) => {
    setResponses((prev) => {
      const current = (prev[questionId] as string[]) || [];
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, [questionId]: updated };
    });
  };

  const handleTextChange = (questionId: number, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const requiredQuestions = questions.filter((q) => q.id < 19);
    const missingAnswers = requiredQuestions.filter((q) => !responses[q.id] || (Array.isArray(responses[q.id]) && responses[q.id].length === 0));

    if (missingAnswers.length > 0) {
      setError('Please answer all required questions (1-18)');
      return;
    }

    setIsSubmitting(true);

    try {
      const { supabase } = await import('../lib/supabase');

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error: insertError } = await supabase
        .from('survey_responses')
        .insert({
          user_id: user.id,
          user_email: userEmail,
          responses: responses,
        });

      if (insertError) throw insertError;

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit survey');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8">
            Your survey responses have been successfully submitted. Your insights are valuable in shaping the future of AI technology.
          </p>
          <button
            onClick={onLogout}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                AI & Technology Professional Survey
              </h1>
              <p className="text-gray-600">Signed in as: {userEmail}</p>
            </div>
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              Sign Out
            </button>
          </div>
          <p className="text-gray-700 leading-relaxed">
            This survey aims to gather insights from technology professionals about AI adoption, concerns, and future expectations. Your responses will help us understand the current landscape of AI in professional settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                {q.id}. {q.question}
                {q.id < 19 && <span className="text-red-500 ml-1">*</span>}
              </label>

              {q.type === 'select' && (
                <select
                  value={(responses[q.id] as string) || ''}
                  onChange={(e) => handleSelectChange(q.id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  required={q.id < 19}
                >
                  <option value="">-- Select an option --</option>
                  {q.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {q.type === 'multiselect' && (
                <div className="space-y-2">
                  {q.options?.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={((responses[q.id] as string[]) || []).includes(option)}
                        onChange={() => handleMultiSelectChange(q.id, option)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'text' && (
                <input
                  type="text"
                  value={(responses[q.id] as string) || ''}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              )}

              {q.type === 'textarea' && (
                <textarea
                  value={(responses[q.id] as string) || ''}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                />
              )}
            </div>
          ))}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Survey
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
