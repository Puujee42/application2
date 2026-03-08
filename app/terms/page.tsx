'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans pb-10">
            {/* Header */}
            <div className="bg-white h-[56px] flex items-center px-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sticky top-0 z-50">
                <Link href="/profile" className="p-2 -ml-2 text-[#1A1A1A]">
                    <ChevronLeft className="w-6 h-6" strokeWidth={2} />
                </Link>
                <h1 className="flex-1 text-center text-[16px] font-bold text-[#1A1A1A] pr-8">
                    Үйлчилгээний нөхцөл
                </h1>
            </div>

            <div className="p-4">
                <p className="text-center text-[12px] text-[#999999] font-medium mb-4">
                    Сүүлд шинэчлэгдсэн: 2024.01.01
                </p>

                <div className="bg-white p-5 rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-[14px] text-[#555555] leading-[1.6] space-y-6">

                    <section>
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-2">1. Ерөнхий нөхцөл</h2>
                        <p>
                            Энэхүү үйлчилгээний нөхцөл нь Soyol Video Shop мобайл аппликэйшнийг ашиглах, худалдан авалт хийхтэй холбоотой харилцааг зохицуулна. Хэрэглэгч апп-д бүртгүүлснээр энэхүү нөхцөлийг зөвшөөрсөнд тооцно.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-2">2. Хэрэглэгчийн эрх үүрэг</h2>
                        <p>
                            Хэрэглэгч нь өөрийн бүртгэлийн мэдээллийн үнэн зөв байдлыг хангах үүрэгтэй бөгөөд нууц үгээ гуравдагч этгээдэд дамжуулахгүй байх үүрэгтэй.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-2">3. Төлбөр тооцоо</h2>
                        <p>
                            Төлбөрийг QPay, банкны шилжүүлэг болон бэлнээр төлж болно. Захиалга баталгаажсан үед барааны үнэ өөрчлөгдөхгүй.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-2">4. Хүргэлтийн нөхцөл</h2>
                        <p>
                            Хүргэлт ажлын өдрүүдэд 09:00 - 21:00 цагийн хооронд хийгдэнэ. Барааны онцлог, хэмжээнээс хамаарч хүргэлтийн үнэ өөр байж болно.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-2">5. Буцаалт, солилцоо</h2>
                        <p>
                            Барааг худалдан авсанаас хойш 48 цагийн дотор лацыг хөндөөгүй, сав баглаа боодлыг гэмтээгээгүй тохиолдолд ижил үнийн дүнтэй бараагаар солих эсвэл буцаах боломжтой.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-2">6. Нууцлалын бодлого</h2>
                        <p>
                            Бид хэрэглэгчийн хувийн мэдээллийг чандлан нууцалж, зөвхөн захиалга хүргэлтийн зорилгоор ашиглах болно.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
