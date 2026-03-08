'use client';

import { MapPin, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AddressConfirmationCardProps {
  data: {
    id: string;
    label: string;
    fullText: string;
  };
}

export default function AddressConfirmationCard({ data }: AddressConfirmationCardProps) {
  const router = useRouter();

  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 border border-white/10 my-2 max-w-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-xl shrink-0">
          <MapPin className="w-5 h-5 text-blue-400" strokeWidth={1.2} />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm mb-1">{data.label}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{data.fullText}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => router.push(`/checkout?addressId=${data.id}`)}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/20 transition-all"
        >
          <Check className="w-3.5 h-3.5" strokeWidth={1.2} />
          Тийм, мөн
        </button>
        <button
          onClick={() => router.push('/checkout?newAddress=true')}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-white/5 transition-all"
        >
          <X className="w-3.5 h-3.5" strokeWidth={1.2} />
          Үгүй, өөр
        </button>
      </div>
    </div>
  );
}
