'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TABS = ['Бүгд', 'Хүлээгдэж буй', 'Хүргэлтэнд', 'Дууссан'];

const SAMPLE_ORDERS = [
  {
    id: 'ORD-1001',
    shop: 'Soyol Official',
    date: '2024.02.28',
    status: 'Хүлээгдэж буй',
    statusColor: 'bg-[#FF6B00]',
    productName: 'Шинэ загварын цүнх',
    price: 125000,
    image: 'https://res.cloudinary.com/dc127wztz/image/upload/v1770896452/banner1_nw6nok.png',
  },
  {
    id: 'ORD-1002',
    shop: 'Электрон бараа',
    date: '2024.02.25',
    status: 'Хүргэлтэнд',
    statusColor: 'bg-blue-500',
    productName: 'Утасгүй чихэвч Pro',
    price: 89000,
    image: 'https://res.cloudinary.com/dc127wztz/image/upload/v1770896152/banner_qhjffv.png',
  },
  {
    id: 'ORD-1003',
    shop: 'Гоо сайхан',
    date: '2024.02.20',
    status: 'Дууссан',
    statusColor: 'bg-green-500',
    productName: 'Гүн чийгшүүлэгч тос',
    price: 45000,
    image: 'https://res.cloudinary.com/dc127wztz/image/upload/v1770896452/banner1_nw6nok.png',
  }
];

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('Бүгд');

  const filteredOrders = activeTab === 'Бүгд'
    ? SAMPLE_ORDERS
    : SAMPLE_ORDERS.filter(o => o.status === activeTab);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans pb-10">
      {/* Header */}
      <div className="bg-white h-[56px] flex items-center px-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sticky top-0 z-50">
        <Link href="/profile" className="p-2 -ml-2 text-[#1A1A1A]">
          <ChevronLeft className="w-6 h-6" strokeWidth={2} />
        </Link>
        <h1 className="flex-1 text-center text-[16px] font-bold text-[#1A1A1A] pr-8">
          Миний захиалга
        </h1>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 border-b border-gray-100 flex overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-3.5 text-[14px] font-bold relative transition-colors ${activeTab === tab ? 'text-[#FF6B00]' : 'text-[#999999]'
              }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="orderTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF6B00] rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="pt-4 px-4 space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-4">
              {/* Top Row */}
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                <span className="text-[14px] font-bold text-[#1A1A1A]">{order.shop}</span>
                <span className="text-[12px] font-medium text-[#999999]">{order.date}</span>
              </div>

              {/* Product Row */}
              <div className="flex gap-3 mb-4">
                <div className="w-[60px] h-[60px] rounded-[8px] bg-gray-50 overflow-hidden shrink-0 relative">
                  <Image
                    src={order.image}
                    alt={order.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-bold text-[#1A1A1A] leading-tight mb-1 truncate">
                    {order.productName}
                  </h3>
                  <p className="text-[14px] text-[#999999] font-medium mb-1.5">
                    {order.price.toLocaleString()}₮
                  </p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-[#999999] uppercase">Нийт дүн</span>
                  <span className="text-[16px] font-black text-[#FF6B00]">
                    {order.price.toLocaleString()}₮
                  </span>
                </div>
                <button className="px-4 py-2 rounded-full border border-[#FF6B00] text-[#FF6B00] text-[13px] font-bold hover:bg-orange-50 transition-colors">
                  Дахин захиалах
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-[80px] h-[80px] rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <span className="text-3xl grayscale opacity-40">📦</span>
            </div>
            <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-1">Захиалга байхгүй байна</h3>
            <p className="text-[14px] text-[#999999]">Та одоогоор ямар нэгэн захиалга хийгээгүй байна.</p>
          </div>
        )}
      </div>
    </div>
  );
}