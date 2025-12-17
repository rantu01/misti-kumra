import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiStar, 
  FiTruck, 
  FiRefreshCw, 
  FiCheck, 
  FiArrowRight, 
} from 'react-icons/fi';
import { GiPumpkin, GiPlantSeed , GiFlowerPot, GiOilPump } from 'react-icons/gi';
import { MdLocalOffer } from 'react-icons/md';

const products = [
  { 
    id: 1, 
    name: 'তাজা মিষ্টি কুমড়া', 
    price: '৬০ টাকা/কেজি', 
    desc: 'সতেজ, প্রাকৃতিক ও ভিটামিন সমৃদ্ধ',
    icon: <GiPumpkin className="text-4xl md:text-5xl" />,
    color: 'from-orange-400 to-orange-600',
    bgColor: 'orange',
    rating: 4.8,
    reviews: 124,
    features: ['তাজা তাজা', 'ভিটামিন এ সমৃদ্ধ', 'চাষের তারিখ স্পষ্ট'],
    badge: 'বেস্টসেলার'
  },
  { 
    id: 2, 
    name: 'কুমড়ার বীজ', 
    price: '২০০ টাকা/১০০ গ্রাম', 
    desc: 'পুষ্টিগুণে ভরপুর, অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ',
    icon: <GiPlantSeed className="text-4xl md:text-5xl" />,
    color: 'from-amber-500 to-amber-700',
    bgColor: 'amber',
    rating: 4.9,
    reviews: 89,
    features: ['জিংক সমৃদ্ধ', 'প্রোটিনের উৎস', 'হার্টের জন্য ভালো'],
    badge: 'ট্রেন্ডিং'
  },
  { 
    id: 3, 
    name: 'কুমড়া ফুল', 
    price: '৮০ টাকা/প্যাক', 
    desc: 'সুপার ফুড, ভিটামিন ও মিনারেলসে পূর্ণ',
    icon: <GiFlowerPot className="text-4xl md:text-5xl" />,
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'yellow',
    rating: 4.7,
    reviews: 67,
    features: ['সতেজ ফুল', 'রান্না উপযোগী', 'স্বাস্থ্যকর'],
    badge: 'নতুন'
  },
  { 
    id: 4, 
    name: 'কুমড়ার তেল', 
    price: '৩৫০ টাকা/বোতল', 
    desc: 'স্বাস্থ্যের জন্য উপকারী, স্কিন কেয়ারে কার্যকরী',
    icon: <GiOilPump className="text-4xl md:text-5xl" />,
    color: 'from-emerald-500 to-emerald-700',
    bgColor: 'emerald',
    rating: 4.6,
    reviews: 203,
    features: ['প্রাকৃতিক তেল', 'স্কিন কেয়ার', 'ভিটামিন ই সমৃদ্ধ'],
    badge: 'প্রিমিয়াম'
  },
];

const Products = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeBadge, setActiveBadge] = useState(null);

  useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, y: 0, scale: 1, 
      transition: { type: "spring", damping: 15, stiffness: 100 }
    }
  };

  const hoverVariants = {
    hover: { y: -10, scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 15 } },
    tap: { scale: 0.95 }
  };

  return (
    <section 
      id="products" 
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-b from-emerald-50 via-amber-50 to-yellow-50 overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="particle absolute w-3 md:w-4 h-3 md:h-4 rounded-full bg-gradient-to-r from-emerald-300/30 to-amber-300/30 blur-sm"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute -top-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-emerald-200/20 to-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-emerald-500 to-amber-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg mb-4 md:mb-6">
            <FiShoppingCart className="text-lg md:text-xl" />
            <span className="text-sm md:text-lg font-semibold">সেরা পণ্য সমূহ</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-amber-700 bg-clip-text text-transparent mb-4 md:mb-6">
            প্রকৃতির গুণসম্পন্ন পণ্য
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-emerald-700/80 max-w-2xl mx-auto leading-relaxed">
            তাজা, পুষ্টিগুণে ভরপুর এবং সম্পূর্ণ প্রাকৃতিক পণ্য যা আপনার স্বাস্থ্য ও সুস্থতার জন্য 
            <span className="text-amber-600 font-semibold"> বিশেষভাবে নির্বাচিত</span>
          </p>
        </motion.div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
        >
          {[{ icon: <FiTruck />, text: 'বিনামূল্যে ডেলিভারি', desc: '৫০০+ টাকার অর্ডারে' },
            { icon: <FiRefreshCw />, text: 'সহজ রিটার্ন', desc: '৭ দিনের মধ্যে' },
            { icon: <MdLocalOffer />, text: 'বিশেষ অফার', desc: 'নতুন গ্রাহকদের জন্য' }].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/40 flex items-center gap-2 md:gap-4"
            >
              <div className="p-2 md:p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 text-white">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-bold text-emerald-800 text-sm md:text-base">{feature.text}</h4>
                <p className="text-xs md:text-sm text-emerald-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              custom={product.id}
              onHoverStart={() => setHoveredCard(product.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
            >
              {/* Product Card */}
              <motion.div
                variants={hoverVariants}
                className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/40 h-full flex flex-col"
              >
                {/* Badge */}
                <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10">
                  <motion.div
                    animate={hoveredCard === product.id ? { scale: 1.1 } : { scale: 1 }}
                    className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold text-white bg-gradient-to-r ${product.color}`}
                  >
                    {product.badge}
                  </motion.div>
                </div>

                {/* Product Image/Icon Area */}
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color}/10 to-transparent`} />
                  <motion.div
                    animate={hoveredCard === product.id ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="absolute -right-8 -bottom-8 w-32 md:w-40 h-32 md:h-40 opacity-20"
                  >
                    {product.icon}
                  </motion.div>
                  <div className="relative h-full flex items-center justify-center">
                    <motion.div
                      animate={hoveredCard === product.id ? { scale: 1.1, y: -8 } : { scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="relative z-10"
                    >
                      <div className={`p-4 md:p-6 rounded-2xl bg-gradient-to-br ${product.color} text-white shadow-lg`}>
                        {product.icon}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <div className="mb-3 md:mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-emerald-900 mb-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-sm text-emerald-600/90 leading-relaxed">
                      {product.desc}
                    </p>
                  </div>
                  <div className="mb-4 md:mb-6 space-y-1 md:space-y-2">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                      >
                        <FiCheck className={`text-${product.bgColor}-500 flex-shrink-0`} />
                        <span className="text-emerald-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-emerald-700">{product.rating}</span>
                    <span className="text-xs md:text-sm text-emerald-500">({product.reviews} রিভিউ)</span>
                  </div>
                  <div className="mt-auto pt-2 md:pt-4 border-t border-emerald-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent">
                          {product.price}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/checkout', { state: { product } })}
                        className={`relative overflow-hidden group/btn px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r ${product.color} hover:shadow-xl transition-shadow flex items-center gap-2`}
                      >
                        <Link to="/checkout" state={{ product }} className="absolute inset-0" />
                        <span className="relative z-10 flex items-center gap-1 md:gap-2">
                          <FiShoppingCart />
                          অর্ডার করুন
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
