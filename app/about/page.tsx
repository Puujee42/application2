'use client';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Shield, 
  DollarSign, 
  Users, 
  Award, 
  Phone, 
  Mail,
  MapPin,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import { SITE_CONFIG } from '@lib/constants';

export default function AboutPage() {
  const features = [
    {
      icon: Truck,
      title: 'Хурдан хүргэлт',
      description: 'Улаанбаатар хотод 24 цагийн дотор, орон нутагт 2-3 хоногийн дотор хүргэнэ',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Баталгаат чанар',
      description: 'Бүх бараанд албан ёсны баталгаа, хэрэв бүтээгдэхүүн гэмтэлтэй бол солих боломжтой',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: DollarSign,
      title: 'Бөөний үнэ',
      description: 'Зах зээлийн хамгийн сайн үнэ, өрсөлдөхүйц үнийн санал, мөнгөн буцаалтын баталгаа',
      color: 'from-soyol to-yellow-400',
    },
    {
      icon: Award,
      title: 'Мэргэжлийн зөвлөгөө',
      description: 'Туршлагатай багийн зөвлөгөө, техникийн дэмжлэг, сургалтын материал',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: '5000+ Сэтгэл хангалуун үйлчлүүлэгч',
      description: 'Монгол даяар мянга мянган хүн бидний үйлчилгээнд итгэдэг',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Clock,
      title: '24/7 Тусламж',
      description: 'Долоо хоногийн 7 өдөр, өдрийн 24 цагаар танд туслахад бэлэн',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const stats = [
    { label: 'Баталгаажсан бараа', value: '500+', icon: Award },
    { label: 'Сэтгэл ханамжтай үйлчлүүлэгч', value: '5000+', icon: Users },
    { label: 'Хүргэлт хийсэн', value: '10000+', icon: Truck },
    { label: 'Одны үнэлгээ', value: '4.9', icon: Star },
  ];

  const timeline = [
    { year: '2020', title: 'Компани байгуулагдсан', description: 'Видео тоног төхөөрөмжийн чиглэлээр үйл ажиллагаа эхэлсэн' },
    { year: '2021', title: 'Онлайн худалдаа', description: 'E-commerce платформыг нээж, цахим худалдааг эхлүүлсэн' },
    { year: '2023', title: 'Орон нутагт тэлэлт', description: 'Дархан, Эрдэнэт хотуудад салбар нээсэн' },
    { year: '2024', title: 'Олон улсын түншлэл', description: 'Sony, Canon, Panasonic брэндүүдийн албан ёсны түнш болсон' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-soyol via-orange-500 to-yellow-400 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              {SITE_CONFIG.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-bold">
              Монголын хамгийн том видео болон дуу бичлэгийн тоног төхөөрөмж борлуулдаг платформ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-lg"
              >
                <stat.icon className="w-10 h-10 mx-auto text-soyol mb-3" />
                <div className="text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Манай давуу тал</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Бид үйлчлүүлэгчдээ хамгийн сайн туршлагаар хангахыг эрхэмлэдэг
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Бидний түүх</h2>
            <p className="text-xl text-gray-600">Хөгжлийн замнал</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-soyol to-yellow-400" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="text-soyol font-black text-2xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-soyol rounded-full border-4 border-white shadow-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">Холбоо барих</h2>
            <p className="text-xl text-gray-400">Бидэнтэй холбогдох хялбар</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition"
            >
              <Phone className="w-10 h-10 mx-auto text-soyol mb-4" />
              <h3 className="text-lg font-bold mb-2">Утас</h3>
              <a href={`tel:${SITE_CONFIG.phone.replace('-', '')}`} className="text-gray-300 hover:text-soyol transition">
                {SITE_CONFIG.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition"
            >
              <Mail className="w-10 h-10 mx-auto text-soyol mb-4" />
              <h3 className="text-lg font-bold mb-2">И-мэйл</h3>
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-gray-300 hover:text-soyol transition">
                {SITE_CONFIG.email}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition"
            >
              <MapPin className="w-10 h-10 mx-auto text-soyol mb-4" />
              <h3 className="text-lg font-bold mb-2">Хаяг</h3>
              <p className="text-gray-300">Улаанбаатар хот, Сүхбаатар дүүрэг</p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-soyol text-white font-bold rounded-2xl shadow-lg glow-orange"
            >
              <Zap className="w-5 h-5" />
              <span>Бараа худалдан авах</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
