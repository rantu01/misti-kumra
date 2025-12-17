import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { TfiQuoteRight, TfiQuoteLeft } from 'react-icons/tfi';
import { TbBrandBooking } from 'react-icons/tb';

const testimonials = [
  { name: 'রহিমা আক্তার', role: 'হোম শেফ', comment: 'অসাধারণ মিষ্টি কুমড়া, পরিবারের সবাই পছন্দ করেছে!', rating: 5, avatar: '👩‍🍳', color: 'from-pink-400 to-rose-500', date: '২ সপ্তাহ আগে' },
  { name: 'জাহিদ হাসান', role: 'নিয়মিত গ্রাহক', comment: 'তাজা এবং মানসম্মত পণ্য, নিয়মিত কিনি। প্যাকেজিং খুব ভালো।', rating: 5, avatar: '👨‍💼', color: 'from-blue-400 to-cyan-500', date: '১ মাস আগে' },
  { name: 'সুবর্ণা রায়', role: 'ফুড ব্লগার', comment: 'কুমড়ার রেসিপি সহ পাচ্ছি, খুব সুবিধা। টিপসগুলো দারুণ!', rating: 4, avatar: '👩‍💻', color: 'from-purple-400 to-violet-500', date: '৩ দিন আগে' },
  { name: 'আনিসুর রহমান', role: 'রেস্তোরাঁ মালিক', comment: 'ব্যবসায়িক অর্ডারের জন্য নিয়মিত নিচ্ছি। মান খুবই ভালো।', rating: 5, avatar: '👨‍🍳', color: 'from-emerald-400 to-green-500', date: '২ মাস আগে' },
  { name: 'নুসরাত জাহান', role: 'পুষ্টিবিদ', comment: 'অর্গানিক পদ্ধতিতে চাষ করা কুমড়া। পেস্টিসাইড মুক্ত।', rating: 5, avatar: '👩‍⚕️', color: 'from-amber-400 to-orange-500', date: '১ সপ্তাহ আগে' },
  { name: 'সাগর আহমেদ', role: 'কৃষিবিদ', comment: 'স্থানীয় কৃষকদের থেকে সরাসরি সংগ্রহ করা হয়। ভালো উদ্যোগ।', rating: 4, avatar: '👨‍🌾', color: 'from-lime-400 to-emerald-500', date: '৪ দিন আগে' },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Tracking logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update index and progress state based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    const index = Math.floor(latest * (testimonials.length - 0.1));
    setActiveIndex(Math.min(index, testimonials.length - 1));
  });

  const linePath = useTransform(
    scrollYProgress,
    [0, 1],
    [`M 10,50 Q 200,50 400,150 Q 600,250 800,300`, `M 10,50 Q 200,150 400,150 Q 600,200 800,300`]
  );

  return (
    // Height 300vh creates the scroll room (more height = slower scroll)
    <div ref={containerRef} className="relative h-[300vh] bg-gradient-to-b from-emerald-50 via-amber-50 to-yellow-50">
      {/* Sticky wrapper: This stays fixed while you scroll through the 300vh height */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-gradient-to-b from-emerald-50/30 to-white">
        
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-amber-500 text-white px-6 py-2 rounded-full shadow-lg mb-4">
              <TbBrandBooking className="text-xl" />
              <span className="font-semibold">গ্রাহক অভিজ্ঞতা</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900">আমাদের গ্রাহকরা কী বলেন</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Timeline */}
            <div className="relative h-[400px]">
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <motion.path 
                  d="M 10,50 Q 200,100 400,150 Q 600,200 800,300"
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="4" 
                />
                <motion.path
                  d="M 10,50 Q 200,100 400,150 Q 600,200 800,300"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="6"
                  style={{ pathLength: scrollYProgress }}
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>

              {testimonials.map((t, i) => {
                const pos = i / (testimonials.length - 1);
                return (
                  <div key={i} className="absolute transition-all duration-300" style={{ left: `${10 + pos * 85}%`, top: `${50 + pos * 40}%` }}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-transform ${i === activeIndex ? 'scale-150 ring-4 ring-emerald-300 bg-emerald-500' : i < activeIndex ? 'bg-emerald-400' : 'bg-gray-300'}`}>
                      {i <= activeIndex ? '✓' : i + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 rounded-3xl shadow-2xl border border-emerald-100"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br ${testimonials[activeIndex].color} text-white`}>
                      {testimonials[activeIndex].avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-900">{testimonials[activeIndex].name}</h3>
                      <p className="text-emerald-600 text-sm">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <TfiQuoteLeft className="text-emerald-100 text-4xl absolute -top-4 -left-2" />
                    <p className="text-lg text-emerald-800 italic relative z-10 pl-6">
                      {testimonials[activeIndex].comment}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => <FiStar key={i} fill={i < testimonials[activeIndex].rating ? "currentColor" : "none"} />)}
                    </div>
                    <span className="text-sm text-emerald-400">{testimonials[activeIndex].date}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-sm mb-2 text-emerald-700 font-medium">
                  <span>অভিজ্ঞতা প্রোগ্রেস</span>
                  <span>{Math.round(scrollProgress * 100)}%</span>
                </div>
                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;