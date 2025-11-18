import { Clipboard, Shield, Clock, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6">
            <Clipboard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Survey AI & Teknologi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bantu kami memahami perspektif profesional tentang adopsi dan dampak
            <br />
            AI di dunia kerja
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mb-6">
              <CheckCircle2 className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Login dengan Google
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Untuk mengisi survey ini, Anda perlu login terlebih dahulu menggunakan akun Google Anda. Proses login cepat dan aman.
            </p>
            <button
              onClick={onGetStarted}
              className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <text x="0" y="20" fontSize="20" fill="currentColor">G</text>
              </svg>
              <span className="group-hover:text-blue-700">Login dengan Google</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg flex-shrink-0 mt-1">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">20 Pertanyaan Komprehensif</h3>
                  <p className="text-sm text-gray-600">
                    Survey dirancang untuk menggali insight mendalam tentang pengalaman dan perspektif Anda terkaitan AI dan teknologi
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Data Aman & Terenkripsi</h3>
                  <p className="text-sm text-gray-600">
                    Jawaban Anda dienkripsi dengan aman dan hanya dapat diakses oleh Anda. Kami menjaga privasi dan keamanan data Anda
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Waktu Pengisian</h3>
                  <p className="text-sm text-blue-100">
                    Estimasi waktu 10-15 menit. Anda dapat menjalankan dengan kepastian sendiri dan mennavigasi antar pertanyaan dengan mudah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mengapa Partisipasi Anda Penting?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Survey ini bertujuan untuk memahami bagaimana professional seperti Anda melihat dan mengadopsi
            teknologi AI. Insight yang Anda berikan akan membantu membentuk pemahaman yang lebih baik tentang
            tren adopsi AI di berbagai industri.
          </p>
        </div>
      </div>
    </div>
  );
}

function BarChart3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="M7 16v-4" />
      <path d="M11 16v-8" />
      <path d="M15 16v-3" />
      <path d="M19 16v-7" />
    </svg>
  );
}
