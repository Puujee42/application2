import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="text-center">
        <div className="relative">
          {/* Spinning loader */}
          <Loader2 className="w-16 h-16 text-soyol animate-spin mx-auto mb-4" />
          
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-soyol/20 rounded-full animate-ping" />
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          Ачаалж байна...
        </h2>
        <p className="text-gray-600 font-medium">
          Түр хүлээнэ үү
        </p>
      </div>
    </div>
  );
}
