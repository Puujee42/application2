'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, Layers, Plus, Trash2, Edit2, 
  Image as ImageIcon, X, Save, Search, ChevronRight, Upload
} from 'lucide-react';

// --- Types (for TypeScript project compatibility) ---
interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  stock: number;
  images: string[];
}

// --- Sample Data ---
const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Электроникс', icon: '💻', color: 'bg-blue-500' },
  { id: '2', name: 'Хувцас', icon: '👕', color: 'bg-purple-500' },
  { id: '3', name: 'Хоол хүнс', icon: '🍎', color: 'bg-green-500' },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '101',
    name: 'iPhone 15 Pro',
    price: 3500000,
    description: 'Хамгийн сүүлийн үеийн ухаалаг гар утас',
    categoryId: '1',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: '102',
    name: 'Ноолууран цамц',
    price: 450000,
    description: '100% цэвэр ноолуур, дулаахан',
    categoryId: '2',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80']
  }
];

export default function AdminPanelDemo() {
  // --- Global State ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories'>('dashboard');
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // --- Product Form State ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productFormData, setProductFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    categoryId: '',
    stock: 0,
    images: []
  });

  // --- Category Form State ---
  const [categoryName, setCategoryName] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('📦');

  // --- Handlers: Categories ---
  const addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryName,
      icon: categoryIcon,
      color: `bg-${['blue', 'green', 'purple', 'orange', 'pink'][Math.floor(Math.random() * 5)]}-500`
    };
    setCategories([...categories, newCategory]);
    setCategoryName('');
    // No need to manually update product dropdown, it reacts to 'categories' state change
  };

  const deleteCategory = (id: string) => {
    if (confirm('Та энэ ангиллыг устгахдаа итгэлтэй байна уу?')) {
      setCategories(categories.filter(c => c.id !== id));
      // Optional: Handle products in this category
    }
  };

  // --- Handlers: Products ---
  const openProductForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        categoryId: product.categoryId,
        stock: product.stock,
        images: product.images
      });
    } else {
      setEditingProduct(null);
      setProductFormData({
        name: '',
        price: 0,
        description: '',
        categoryId: categories[0]?.id || '', // Default to first category
        stock: 0,
        images: []
      });
    }
    setIsProductFormOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (productFormData.images.length >= 4) {
        alert('Дээд тал нь 4 зураг оруулах боломжтой');
        return;
      }
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProductFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
    }
  };

  const removeImage = (index: number) => {
    setProductFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name || !productFormData.categoryId) {
      alert('Нэр болон ангилал заавал шаардлагатай');
      return;
    }

    if (editingProduct) {
      // Edit
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productFormData, id: editingProduct.id } : p));
    } else {
      // Add
      const newProduct: Product = {
        ...productFormData,
        id: Date.now().toString()
      };
      setProducts([...products, newProduct]);
    }
    setIsProductFormOpen(false);
  };

  const deleteProduct = (id: string) => {
    if (confirm('Бүтээгдэхүүнийг устгах уу?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // --- Render Helpers ---
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT' }).format(price);
  };

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || 'Unknown';
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-xl z-20`}>
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-lg shrink-0">
            S
          </div>
          {isSidebarOpen && <h1 className="text-xl font-bold tracking-tight">Soyol Admin</h1>}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            {isSidebarOpen && <span className="font-medium">Хяналтын самбар</span>}
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Package size={20} />
            {isSidebarOpen && <span className="font-medium">Бүтээгдэхүүн</span>}
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'categories' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Layers size={20} />
            {isSidebarOpen && <span className="font-medium">Ангилал</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-slate-400">
            {isSidebarOpen ? ' хураах' : '→'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Хяналтын самбар'}
            {activeTab === 'products' && 'Бүтээгдэхүүний жагсаалт'}
            {activeTab === 'categories' && 'Ангилал удирдах'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              AD
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-auto p-8">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Нийт бүтээгдэхүүн</p>
                  <h3 className="text-2xl font-black text-gray-900">{products.length}</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                  <Layers size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Нийт ангилал</p>
                  <h3 className="text-2xl font-black text-gray-900">{categories.length}</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-green-50 text-green-600 rounded-xl">
                  <Save size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Нийт үлдэгдэл</p>
                  <h3 className="text-2xl font-black text-gray-900">{products.reduce((acc, p) => acc + p.stock, 0)}</h3>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS VIEW */}
          {activeTab === 'products' && !isProductFormOpen && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Хайх..." 
                    className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 w-64"
                  />
                </div>
                <button 
                  onClick={() => openProductForm()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20"
                >
                  <Plus size={20} />
                  Бүтээгдэхүүн нэмэх
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Зураг</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Нэр</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Ангилал</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Үнэ</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Үлдэгдэл</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                            {product.images[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={20} /></div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
                            {getCategoryName(product.categoryId)}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">{formatPrice(product.price)}</td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${product.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>
                            {product.stock} ш
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => openProductForm(product)}
                              className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {products.length === 0 && (
                  <div className="p-12 text-center text-gray-400">
                    Бүтээгдэхүүн олдсонгүй
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PRODUCT FORM */}
          {activeTab === 'products' && isProductFormOpen && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setIsProductFormOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <ChevronRight className="rotate-180 text-gray-500" />
                </button>
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? 'Бүтээгдэхүүн засах' : 'Шинэ бүтээгдэхүүн'}
                </h3>
              </div>

              <form onSubmit={saveProduct} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Бүтээгдэхүүний нэр</label>
                    <input 
                      required
                      type="text" 
                      value={productFormData.name}
                      onChange={e => setProductFormData({...productFormData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      placeholder="Жишээ: iPhone 15"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Үнэ (₮)</label>
                    <input 
                      required
                      type="number" 
                      value={productFormData.price}
                      onChange={e => setProductFormData({...productFormData, price: Number(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Ангилал</label>
                    <select 
                      required
                      value={productFormData.categoryId}
                      onChange={e => setProductFormData({...productFormData, categoryId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
                    >
                      <option value="">Ангилал сонгох</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Үлдэгдэл тоо</label>
                    <input 
                      required
                      type="number" 
                      value={productFormData.stock}
                      onChange={e => setProductFormData({...productFormData, stock: Number(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Тайлбар</label>
                  <textarea 
                    rows={3}
                    value={productFormData.description}
                    onChange={e => setProductFormData({...productFormData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                    placeholder="Бүтээгдэхүүний дэлгэрэнгүй тайлбар..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Зураг (Дээд тал нь 4)</label>
                  <div className="grid grid-cols-4 gap-4">
                    {productFormData.images.map((img, idx) => (
                      <div key={idx} className="aspect-square relative rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {productFormData.images.length < 4 && (
                      <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-amber-500 hover:bg-amber-50 transition-all flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-amber-600">
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs font-bold">Зураг нэмэх</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsProductFormOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Болих
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all"
                  >
                    {editingProduct ? 'Шинэчлэх' : 'Хадгалах'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CATEGORIES VIEW */}
          {activeTab === 'categories' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Шинэ ангилал нэмэх</h3>
                <form onSubmit={addCategory} className="flex gap-4">
                  <div className="relative">
                    <button 
                      type="button"
                      className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-xl hover:bg-gray-50"
                      onClick={() => setCategoryIcon(['📦', '💻', '👕', '👠', '🏠', '⚽', '🎮', '📚'][Math.floor(Math.random() * 8)])}
                    >
                      {categoryIcon}
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    placeholder="Ангиллын нэр..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Нэмэх
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-500/50 transition-all group relative">
                    <button 
                      onClick={() => deleteCategory(category.id)}
                      className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl mb-4">
                      {category.icon}
                    </div>
                    <h4 className="font-bold text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {products.filter(p => p.categoryId === category.id).length} бүтээгдэхүүн
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}