'use client';

import { useState, useCallback } from 'react';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useUser } from '@/context/AuthContext';
import { Video, Phone, Loader2, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

import { ArrowLeft } from 'lucide-react';

interface VideoCallProps {
  prefilledRoom?: string;
  onBack?: () => void;
}

export default function VideoCall({ prefilledRoom, onBack }: VideoCallProps) {
  const { user } = useUser();
  const [room, setRoom] = useState(prefilledRoom || '');
  const [token, setToken] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);

  const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  const joinRoom = useCallback(async () => {
    if (!room.trim()) {
      toast.error('Өрөөний нэр оруулна уу');
      return;
    }

    setConnecting(true);
    try {
      const res = await fetch('/api/livekit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: room.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get token');
      }

      setToken(data.token);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Алдаа гарлаа';
      toast.error(message);
    } finally {
      setConnecting(false);
    }
  }, [room]);

  const copyRoomName = () => {
    navigator.clipboard.writeText(room);
    setCopied(true);
    toast.success('Өрөөний нэр хуулагдлаа');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    setToken('');
    toast.success('Дуудлага дууслаа');
  };

  if (token && livekitUrl) {
    return (
      <div className="h-[calc(100vh-120px)]">
        <LiveKitRoom
          serverUrl={livekitUrl}
          token={token}
          connect={true}
          onDisconnected={handleDisconnect}
          data-lk-theme="default"
          style={{ height: '100%' }}
        >
          <VideoConference />
          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Буцах</span>
          </button>
        )}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Видео дуудлага
          </h1>
          <p className="text-slate-600">
            Өрөөний нэр оруулж видео дуудлага эхлүүлнэ үү
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="room" className="block text-sm font-medium text-slate-700 mb-2">
                Өрөөний нэр
              </label>
              <div className="flex gap-2">
                <input
                  id="room"
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
                  placeholder="my-room"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                />
                {room && (
                  <button
                    onClick={copyRoomName}
                    className="px-3 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                    title="Хуулах"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Нөгөө хүнтэйгээ адил нэр оруулна уу
              </p>
            </div>

            <button
              onClick={joinRoom}
              disabled={connecting || !room.trim()}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {connecting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Холбогдож байна...</span>
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  <span>Нэгдэх</span>
                </>
              )}
            </button>
          </div>

          {user && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 text-center">
                {user.fullName || user.firstName} болон нэгдэж байна
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
