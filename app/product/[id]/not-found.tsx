import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Бараа олдсонгүй</h1>
        <p className="text-gray-600 mb-8">
          Энэ бараа одоогоор байхгүй эсвэл устгагдсан байж болно.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition"
        >
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </div>
  );
}
