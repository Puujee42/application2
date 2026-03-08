
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Loader2, Plus, Edit2, Trash2, CheckCircle2, Tag
} from 'lucide-react';


interface Attribute {
  _id: string;
  name: string;
  type: 'select' | 'text' | 'number';
  options: string[];
}

export default function AttributesPage() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'select',
    options: '',
  });

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const res = await fetch('/api/attributes');
      if (res.ok) {
        const data = await res.json();
        setAttributes(data);
      }
    } catch (error) {
      console.error('Failed to fetch attributes:', error);
      toast.error('Failed to load attributes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const optionsArray = formData.options.split(',').map(o => o.trim()).filter(Boolean);

      const payload = {
        name: formData.name,
        type: formData.type,
        options: optionsArray,
      };

      if (editing) {
        // Update existing
        const res = await fetch('/api/attributes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing, ...payload }),
        });
        if (res.ok) {
          toast.success('Attribute updated successfully');
          setEditing(null);
        } else {
          toast.error('Failed to update attribute');
        }
      } else {
        // Create new
        const res = await fetch('/api/attributes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          toast.success('Attribute created successfully');
        } else {
          const data = await res.json();
          toast.error(data.error || 'Failed to create attribute');
        }
      }

      setFormData({ name: '', type: 'select', options: '' });
      fetchAttributes();

    } catch (error) {
      console.error('Error saving attribute:', error);
      toast.error('An error occurred');
    }
  };

  const handleEdit = (attr: Attribute) => {
    setEditing(attr._id);
    setFormData({
      name: attr.name,
      type: attr.type,
      options: attr.options.join(', '),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this attribute?')) return;
    try {
      const res = await fetch(`/api/attributes?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Attribute deleted');
        fetchAttributes();
      } else {
        toast.error('Failed to delete attribute');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('An error occurred');
    }
  };

  if (loading) return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-amber-500 w-10 h-10" /></div>;

  return (
    <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-30 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 lg:hidden">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Нэмэлт шинж чанарууд</h1>
                <p className="text-xs text-slate-400 lg:block hidden">Барааны нэмэлт мэдээллийн удирдлага</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Create/Edit Form */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-lg font-bold mb-6 text-white">{editing ? 'Шинж чанар засах' : 'Шинэ шинж чанар нэмэх'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Нэр</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Жишээ: Өнгө, Хэмжээ"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Төрөл</label>
                <div className="relative">
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:border-amber-500/50 outline-none appearance-none cursor-pointer"
                  >
                    <option value="select">Сонгох (Dropdown)</option>
                    <option value="text">Текст (Text Input)</option>
                    <option value="number">Тоо (Number Input)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Сонголтууд (Таслалаар тусгаарлана уу)</label>
                <input
                  type="text"
                  value={formData.options}
                  onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                  placeholder="Жишээ: Улаан, Цэнхэр, Ногоон"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-amber-500/50 outline-none transition-all disabled:opacity-50"
                  disabled={formData.type !== 'select'}
                />
                <p className="mt-2 text-[10px] text-slate-500 italic">Зөвхөн &quot;Сонгох&quot; төрөлд ашиглагдана</p>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-white/5">
                {editing && (
                  <button
                    type="button"
                    onClick={() => { setEditing(null); setFormData({ name: '', type: 'select', options: '' }); }}
                    className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-medium transition-all"
                  >
                    Цуцлах
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2"
                >
                  {editing ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editing ? 'Шинэчлэх' : 'Нэмэх'}
                </button>
              </div>
            </form>
          </div>

          {/* Attributes List */}
          <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800/50 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/10">
                    <th className="px-6 py-4">Нэр</th>
                    <th className="px-6 py-4">Төрөл</th>
                    <th className="px-6 py-4">Сонголтууд</th>
                    <th className="px-6 py-4 text-right">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {attributes.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-sm italic">Шинж чанар олдсонгүй.</td>
                    </tr>
                  ) : (
                    attributes.map((attr) => (
                      <tr key={attr._id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">{attr.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 capitalize">
                          {attr.type === 'select' ? 'Сонгох' : attr.type === 'text' ? 'Текст' : 'Тоо'}
                        </td>
                        <td className="px-6 py-4">
                          {attr.options?.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {attr.options.map((opt, i) => (
                                <span key={i} className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-[10px] font-bold border border-amber-500/20">{opt}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-600 italic text-xs">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(attr)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                              title="Засах"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(attr._id)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              title="Устгах"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
