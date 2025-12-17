import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiStar, 
  FiTruck, 
  FiRefreshCw, 
  FiCheck, 
  FiX,
  FiPackage,
  FiDroplet,
  FiHeart,
  FiShare2,
  FiMinus,
  FiPlus
} from 'react-icons/fi';
import { FaLeaf } from "react-icons/fa";
import { GiPumpkin, GiPlantSeed, GiFlowerPot, GiOilPump } from 'react-icons/gi';
import { MdLocalOffer, MdOutlineHealthAndSafety } from 'react-icons/md';

const products = [
  { 
    id: 1, 
    name: 'তাজা মিষ্টি কুমড়া', 
    price: '60', 
    unit: 'প্রতি কেজি',
    desc: 'সতেজ, প্রাকৃতিক ও ভিটামিন সমৃদ্ধ মিষ্টি কুমড়া যা সরাসরি কৃষকের কাছ থেকে সংগ্রহ করা হয়।',
    icon: <GiPumpkin className="text-5xl" />,
    color: 'from-orange-400 via-orange-500 to-orange-600',
    bgColor: 'bg-gradient-to-r from-orange-500/10 to-orange-600/10',
    rating: 4.8,
    reviews: 124,
    features: [
      { icon: '🌱', text: 'অর্গানিক চাষ' },
      { icon: '📅', text: 'তাজা সংগ্রহ' },
      { icon: '🥬', text: 'ভিটামিন এ সমৃদ্ধ' },
    ],
    details: [
      'সরাসরি কৃষকের কাছ থেকে সংগ্রহ',
      'কোনো কেমিক্যাল ব্যবহার নেই',
      '৪৮ ঘন্টার মধ্যে সংগ্রহ',
      'হাইড্রোপোনিক পদ্ধতি'
    ],
    badge: 'বেস্টসেলার',
    stock: 25
  },
  { 
    id: 2, 
    name: 'কুমড়ার বীজ', 
    price: '200', 
    unit: '১০০ গ্রাম',
    desc: 'পুষ্টিগুণে ভরপুর, অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ কুমড়ার বীজ যা হার্টের জন্য উপকারী।',
    icon: <GiPlantSeed className="text-5xl" />,
    color: 'from-amber-400 via-amber-500 to-amber-600',
    bgColor: 'bg-gradient-to-r from-amber-500/10 to-amber-600/10',
    rating: 4.9,
    reviews: 89,
    features: [
      { icon: '💪', text: 'প্রোটিন সমৃদ্ধ' },
      { icon: '❤️', text: 'হার্টের জন্য ভালো' },
      { icon: '🛡️', text: 'অ্যান্টিঅক্সিডেন্ট' },
    ],
    details: [
      '১০০% প্রাকৃতিক বীজ',
      'রোস্টেড ও সল্টেড',
      'জিংক ও ম্যাগনেসিয়ামে সমৃদ্ধ',
      'ওজন নিয়ন্ত্রণে সাহায্য করে'
    ],
    badge: 'ট্রেন্ডিং',
    stock: 18
  },
  { 
    id: 3, 
    name: 'কুমড়া ফুল', 
    price: '80', 
    unit: 'প্রতি প্যাক',
    desc: 'সুপার ফুড, ভিটামিন ও মিনারেলসে পূর্ণ কুমড়া ফুল যা রান্নায় বিশেষ স্বাদ যোগ করে।',
    icon: <GiFlowerPot className="text-5xl" />,
    color: 'from-yellow-400 via-yellow-500 to-yellow-600',
    bgColor: 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10',
    rating: 4.7,
    reviews: 67,
    features: [
      { icon: '🌸', text: 'সতেজ ফুল' },
      { icon: '🍳', text: 'রান্না উপযোগী' },
      { icon: '💊', text: 'ভিটামিন সি সমৃদ্ধ' },
    ],
    details: [
      'সকালে তোলা সতেজ ফুল',
      'ব্রেস্টেড বা স্টাফ করার জন্য উপযুক্ত',
      'লৌহ ও ক্যালসিয়ামে সমৃদ্ধ',
      'লো-ক্যালোরি ফুড'
    ],
    badge: 'নতুন',
    stock: 12
  },
  { 
    id: 4, 
    name: 'কুমড়ার তেল', 
    price: '350', 
    unit: 'প্রতি বোতল',
    desc: 'স্বাস্থ্যের জন্য উপকারী, স্কিন কেয়ারে কার্যকরী বিশুদ্ধ কুমড়ার তেল।',
    icon: <GiOilPump className="text-5xl" />,
    color: 'from-emerald-400 via-emerald-500 to-emerald-600',
    bgColor: 'bg-gradient-to-r from-emerald-500/10 to-emerald-600/10',
    rating: 4.6,
    reviews: 203,
    features: [
      { icon: '🧴', text: 'প্রাকৃতিক তেল' },
      { icon: '✨', text: 'স্কিন কেয়ার' },
      { icon: '💆', text: 'ভিটামিন ই সমৃদ্ধ' },
    ],
    details: [
      'কোল্ড প্রেসড এক্সট্রাকশন',
      '১০০% বিশুদ্ধ ও অরগানিক',
      'হেয়ার গ্রোথে সাহায্য করে',
      'এন্টি-এজিং প্রপার্টি'
    ],
    badge: 'প্রিমিয়াম',
    stock: 30
  },
];

const Products = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Features for top banner
  const features = [
    { icon: <FiTruck />, text: 'ফ্রি ডেলিভারি', desc: '৫০০৳+ অর্ডারে' },
    { icon: <FiRefreshCw />, text: 'ইজি রিটার্ন', desc: '৭ দিনের গ্যারান্টি' },
    { icon: <MdLocalOffer />, text: 'বিশেষ অফার', desc: '১৫% ডিসকাউন্ট' },
    { icon: <MdOutlineHealthAndSafety />, text: '১০০% অরগানিক', desc: 'প্রমাণিত' },
  ];

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const handleOrder = () => {
    if (selectedProduct) {
      // Store product info in session storage or state management
      sessionStorage.setItem('selectedProduct', JSON.stringify({
        ...selectedProduct,
        quantity,
        total: parseInt(selectedProduct.price) * quantity
      }));
      
      // Close modal and redirect to checkout
      closeModal();
      window.location.href = '/checkout';
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <>
      <section 
        ref={sectionRef}
        id="products" 
        className="relative py-20 bg-gradient-to-b from-emerald-50/50 via-white to-amber-50/50 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/20 to-amber-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl" />
          
          {/* Floating Icons */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-10"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 40, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
              }}
            >
              {i % 4 === 0 ? <GiPumpkin /> : 
               i % 4 === 1 ? <GiPlantSeed /> : 
               i % 4 === 2 ? <GiFlowerPot /> : <GiOilPump />}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg mb-6">
              <FiPackage className="text-xl" />
              <span className="text-lg font-semibold">প্রিমিয়াম পণ্য সংগ্রহ</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-amber-700 bg-clip-text text-transparent mb-6">
              প্রকৃতির নির্বাচিত উপহার
            </h2>
            
            <p className="text-xl text-emerald-700/80 max-w-3xl mx-auto leading-relaxed">
              প্রতিটি পণ্য আমাদের বিশেষজ্ঞ টিম দ্বারা যাচাইকৃত, যাতে আপনি পান 
              <span className="text-amber-600 font-semibold"> ১০০% বিশুদ্ধ ও গুণগত মানের</span> পণ্য
            </p>
          </motion.div>

          {/* Features Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/40 text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 text-white mb-3">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-emerald-800 text-sm md:text-base mb-1">
                  {feature.text}
                </h4>
                <p className="text-xs md:text-sm text-emerald-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Products Grid - Unique Card Design */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                whileHover="hover"
                custom={index}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="relative group cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                {/* Product Card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/40 h-full flex flex-col">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <motion.div
                      animate={hoveredProduct === product.id ? { scale: 1.1, rotate: [0, 5, -5, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.color} shadow-lg`}
                    >
                      {product.badge}
                    </motion.div>
                  </div>

                  {/* Stock Indicator */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">
                      {product.stock} পিস স্টক
                    </div>
                  </div>

                  {/* Product Image Area */}
                  <div className={`relative h-48 ${product.bgColor} overflow-hidden`}>
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-white/20 to-transparent top-1/4 left-1/4" />
                      <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-white/20 to-transparent bottom-1/4 right-1/4" />
                    </div>

                    {/* Main Icon with Animation */}
                    <motion.div
                      animate={hoveredProduct === product.id ? 
                        { 
                          scale: 1.1, 
                          rotate: 360,
                          y: -10 
                        } : { 
                          scale: 1, 
                          rotate: 0,
                          y: 0 
                        }}
                      transition={{ 
                        rotate: { duration: 3, ease: "linear" },
                        scale: { type: "spring", stiffness: 200 }
                      }}
                      className="relative z-10 h-full flex items-center justify-center"
                    >
                      <div className={`p-6 rounded-2xl bg-gradient-to-br ${product.color} text-white shadow-2xl transform transition-all duration-300`}>
                        {product.icon}
                      </div>
                    </motion.div>

                    {/* Hover Effect Rings */}
                    <AnimatePresence>
                      {hoveredProduct === product.id && (
                        <>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0.3 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 rounded-full border-2 border-white/30"
                          />
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 2, opacity: 0.1 }}
                            exit={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 rounded-full border-2 border-white/20"
                          />
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Product Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-emerald-600/90 leading-relaxed line-clamp-2">
                        {product.desc}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex gap-2 mb-2">
                        {product.features.map((feature, idx) => (
                          <div 
                            key={idx}
                            className="flex-1 text-center p-2 rounded-lg bg-emerald-50 border border-emerald-100"
                          >
                            <div className="text-lg mb-1">{feature.icon}</div>
                            <div className="text-xs text-emerald-700 font-medium">{feature.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} text-sm`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-emerald-700">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-emerald-500">
                        ({product.reviews} রিভিউ)
                      </span>
                    </div>

                    {/* Price & CTA */}
                    <div className="mt-auto pt-4 border-t border-emerald-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent">
                            {product.price}৳
                          </div>
                          <div className="text-xs text-emerald-600">{product.unit}</div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r ${product.color} hover:shadow-xl transition-shadow flex items-center gap-2`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openProductModal(product);
                          }}
                        >
                          <FiShoppingCart className="text-sm" />
                          <span className="text-sm">বিস্তারিত</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Quick View */}
                <AnimatePresence>
                  {hoveredProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-emerald-100 flex items-center gap-2">
                        <span className="text-sm font-bold text-emerald-700">
                          ক্লিক করে বিস্তারিত দেখুন
                        </span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <FiShoppingCart className="text-emerald-600" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/40">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                কেন আমাদের পণ্য নির্বাচন করবেন?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: <FaLeaf />, value: '১০০%', label: 'অরগানিক' },
                  { icon: <FiCheck />, value: '৯৮%', label: 'গ্রাহক সন্তুষ্টি' },
                  { icon: <FiDroplet />, value: '০%', label: 'কেমিক্যাল মুক্ত' },
                  { icon: <FiHeart />, value: '৫০০০+', label: 'সফল বিক্রয়' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-3 rounded-xl bg-white text-emerald-600 mb-3">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-emerald-700 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <FiX />
              </button>

              {/* Modal Content */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side - Product Image & Info */}
                <div className={`p-8 ${selectedProduct.bgColor} md:rounded-l-3xl`}>
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="inline-block mb-6"
                    >
                      <div className={`p-8 rounded-2xl bg-gradient-to-br ${selectedProduct.color} text-white shadow-2xl`}>
                        {selectedProduct.icon}
                      </div>
                    </motion.div>
                    
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${selectedProduct.color}`}>
                        {selectedProduct.badge}
                      </div>
                      <span className="text-emerald-700 font-bold">
                        {selectedProduct.stock} পিস স্টক আছে
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-emerald-900 mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-emerald-600 mb-6">
                      {selectedProduct.desc}
                    </p>

                    <div className="flex items-center justify-center gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent">
                          {selectedProduct.price}৳
                        </div>
                        <div className="text-sm text-emerald-600">{selectedProduct.unit}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`${i < Math.floor(selectedProduct.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-bold text-emerald-700">
                          {selectedProduct.rating}
                        </span>
                      </div>
                      <span className="text-emerald-500">
                        ({selectedProduct.reviews} রিভিউ)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Product Details & Order */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-emerald-800 mb-6">
                    পণ্য বিস্তারিত
                  </h3>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {selectedProduct.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100"
                      >
                        <div className="text-2xl">{feature.icon}</div>
                        <div>
                          <div className="font-bold text-emerald-700">{feature.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Details List */}
                  <div className="mb-8">
                    <h4 className="font-bold text-emerald-800 mb-3">বিশেষ বৈশিষ্ট্য:</h4>
                    <ul className="space-y-2">
                      {selectedProduct.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FiCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                          <span className="text-emerald-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-8">
                    <h4 className="font-bold text-emerald-800 mb-3">পরিমাণ নির্বাচন করুন:</h4>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={decrementQuantity}
                        className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                      >
                        <FiMinus />
                      </button>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-800">
                          {quantity}
                        </div>
                        <div className="text-sm text-emerald-600">
                          {selectedProduct.unit.split(' ')[1]} সংখ্যা
                        </div>
                      </div>
                      <button
                        onClick={incrementQuantity}
                        className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="mb-8 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl border border-emerald-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-emerald-600">মোট মূল্য</div>
                        <div className="text-2xl font-bold text-emerald-800">
                          {parseInt(selectedProduct.price) * quantity}৳
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-emerald-600">
                          {quantity} × {selectedProduct.price}৳
                        </div>
                        <div className="text-sm text-amber-600 font-bold">
                          {selectedProduct.unit}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleOrder}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
                    >
                      <FiShoppingCart />
                      এখনই অর্ডার করুন
                    </button>
                    <button
                      onClick={() => {
                        // Share functionality
                        navigator.share?.({
                          title: selectedProduct.name,
                          text: selectedProduct.desc,
                          url: window.location.href,
                        });
                      }}
                      className="px-4 py-4 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Products;