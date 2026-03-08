'use client';

import { useState, useTransition } from 'react';
import { createProduct } from '@/app/actions/products';
import toast from 'react-hot-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';

const categories = [
  { value: 'tech', label: 'Tech & Electronics' },
  { value: 'fashion', label: 'Fashion & Apparel' },
  { value: 'home', label: 'Home & Living' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'sports', label: 'Sports & Outdoors' },
];

const SECTIONS = [
  { id: 'Шинэ', label: 'Шинэ', icon: '🔥' },
  { id: 'Бэлэн', label: 'Бэлэн', icon: '📦' },
  { id: 'Захиалга', label: 'Захиалга', icon: '🌐' },
  { id: 'Хямдрал', label: 'Хямдрал', icon: '🏷️' },
];

export default function AddProductForm() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    discountPercent: '',
    sections: [] as string[],
    image: '',
    category: 'tech',
    stockStatus: 'in-stock',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.price) {
      toast.error('Please fill in required fields');
      return;
    }

    startTransition(async () => {
      const result = await createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        discountPercent: formData.discountPercent ? parseFloat(formData.discountPercent) : undefined,
        sections: formData.sections,
        image: formData.image,
        category: formData.category,
        stockStatus: formData.stockStatus,
        inventory: 0,
      });

      if (result.success) {
        toast.success('Product added successfully!', {
          icon: '✅',
          style: {
            borderRadius: '12px',
            background: '#10B981',
            color: '#fff',
          },
        });

        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          originalPrice: '',
          discountPercent: '',
          sections: [],
          image: '',
          category: 'tech',
          stockStatus: 'in-stock',
        });
      } else {
        toast.error(result.error || 'Failed to add product');
      }
    });
  };

  // Auto-calculate price
  const isDiscounted = formData.sections.includes('Хямдрал');
  const op = parseFloat(formData.originalPrice);
  const dp = parseFloat(formData.discountPercent);

  if (isDiscounted && !isNaN(op) && !isNaN(dp)) {
    const calculatedPrice = Math.round((op * (1 - dp / 100)) / 10) * 10;
    if (String(calculatedPrice) !== formData.price) {
      setFormData(prev => ({ ...prev, price: String(calculatedPrice) }));
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isPending}
          placeholder="e.g., iPhone 15 Pro Max"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          disabled={isPending}
          placeholder="Product description..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all resize-none disabled:bg-slate-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Sections */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Харагдах хэсэг
        </label>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((section) => {
            const isSelected = formData.sections.includes(section.id);
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  const newSections = isSelected
                    ? formData.sections.filter(id => id !== section.id)
                    : [...formData.sections, section.id];
                  setFormData({ ...formData, sections: newSections });
                }}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 ${isSelected
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-orange-200'
                  }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discount Fields Combined */}
      {isDiscounted ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
          <div>
            <label className="block text-[11px] font-bold text-orange-800 uppercase mb-2">Анхны үнэ *</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-orange-200 focus:border-orange-500 outline-none"
              placeholder="49900"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-orange-800 uppercase mb-2">Хямдрал % *</label>
            <input
              type="number"
              name="discountPercent"
              value={formData.discountPercent}
              onChange={handleChange}
              required
              min="1"
              max="99"
              className="w-full px-4 py-2.5 rounded-xl border border-orange-200 focus:border-orange-500 outline-none"
              placeholder="20"
            />
          </div>
          <div className="sm:col-span-2 text-xs font-bold text-orange-600">
            Үнэ: {formData.price}₮ (Автоматаар тооцоологдсон)
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
            Price (₮) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            disabled={isPending}
            placeholder="e.g., 1299000"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
          />
        </div>
      )}

      {/* Image URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          disabled={isPending}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
        />
        <p className="text-xs text-slate-500 mt-1.5">
          Recommended: Unsplash or high-quality product images
        </p>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={isPending}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed bg-white"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Stock Status */}
      <div>
        <label htmlFor="stockStatus" className="block text-sm font-medium text-slate-700 mb-2">
          Stock Status <span className="text-red-500">*</span>
        </label>
        <select
          id="stockStatus"
          name="stockStatus"
          value={formData.stockStatus}
          onChange={handleChange}
          disabled={isPending}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed bg-white"
        >
          <option value="in-stock">In Stock (Ready to Ship)</option>
          <option value="pre-order">Pre-Order</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Adding Product...
          </>
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Add Product
          </>
        )}
      </button>
    </form>
  );
}
