import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 15 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFinalImage, setShowFinalImage] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState([]);
  const [hasClosedPopup, setHasClosedPopup] = useState(false);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(Date.now());

  // Image URLs
  const initialPumpkin = " image.png";
  const destinationImage = "image1.png";

  useEffect(() => {
    const particlesArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      emoji: ['🌱', '🍃', '🌿', '✨', '⭐', '🌟', '💫', '🎯'][Math.floor(Math.random() * 8)]
    }));
    setParticles(particlesArray);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;

      // Scroll speed range - finishes faster (within 40% of page scroll)
      const progress = Math.min(scrollY / (windowHeight * 0.4), 1);
      setScrollProgress(progress);

      const now = Date.now();
      const timeDiff = now - lastScrollTime.current;
      const diff = Math.abs(scrollY - lastScrollY);
      
      if (timeDiff > 0) {
        const speed = diff / timeDiff;
        setScrollSpeed(prev => prev * 0.7 + speed * 0.3);
      }

      setLastScrollY(scrollY);
      lastScrollTime.current = now;

      if (progress >= 0.98 && !showFinalImage && !hasClosedPopup) {
        setTimeout(() => setShowFinalImage(true), 300);
      } else if (progress < 0.95) {
        setShowFinalImage(false);
      }

      // Rotation and Position Logic
      setRotation(progress * 720); 
      const startY = 15;
      const endY = 75;
      setPosition({ x: 50, y: startY + (endY - startY) * progress });

      setIsVisible(scrollY <= 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, showFinalImage, hasClosedPopup]);

  useEffect(() => {
    const popupClosed = localStorage.getItem('pumpkin_popup_closed');
    if (popupClosed === 'true') setHasClosedPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowFinalImage(false);
    setHasClosedPopup(true);
    localStorage.setItem('pumpkin_popup_closed', 'true');
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen pb-16 bg-gradient-to-b from-emerald-50 via-amber-50 to-yellow-50 flex items-center justify-center overflow-hidden px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        {particles.map((p) => (
          <motion.div key={p.id} className="absolute text-2xl opacity-20" style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: `${p.size}px` }} animate={{ y: [0, -30, 0], rotate: [0, 360] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}>
            {p.emoji}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10 py-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: isVisible ? 1 : 0.3, y: isVisible ? 0 : -10 }} className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-amber-700 bg-clip-text text-transparent mb-4 leading-tight">
            প্রকৃতির মিষ্টি উপহার
          </h1>
          <p className="text-2xl text-emerald-700/80 mb-6 max-w-3xl mx-auto font-light">
            বাংলাদেশের সেরা মিষ্টি কুমড়া, তাজা ও পুষ্টিগুণে ভরপুর
          </p>
        </motion.div>

        <div className="relative h-[450px] w-full mb-20">
          {/* Vertical Path Line */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            <line x1="50%" y1="15%" x2="50%" y2="75%" stroke="url(#gradient)" strokeWidth="3" strokeDasharray="10,5" className="opacity-40" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated Image */}
          <motion.div className="absolute" style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translateX(-50%)' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-amber-400/30 blur-xl rounded-full -m-4" />
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-8 border-white shadow-2xl" style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.1s linear' }}>
                <img src={scrollProgress >= 0.98 ? destinationImage : initialPumpkin} alt="Product" className="w-full h-full object-cover scale-110" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          <button className="bg-emerald-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-transform">অর্ডার করুন</button>
          <button className="bg-amber-500 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-transform">রেসিপি দেখুন</button>
        </div> */}
      </div>

      {/* Full Modal Design Restored */}
      <AnimatePresence>
        {showFinalImage && !hasClosedPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClosePopup} />
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
              <button onClick={handleClosePopup} className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">✕</button>
              
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent mb-2">গন্তব্যে পৌঁছেছেন! 🎉</h2>
                <p className="text-emerald-700/80">মিষ্টি কুমড়ার যাত্রা সফল হয়েছে!</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img src={destinationImage} alt="Food" className="rounded-2xl shadow-xl w-full h-52 object-cover" />
                  <div className="absolute -bottom-3 -right-3 bg-amber-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-md">সুস্বাদু রেসিপি</div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3">পুষ্টিগুণ ও উপকারিতা:</h3>
                  <ul className="space-y-2 text-emerald-700/90 text-sm mb-6">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />ভিটামিন এ ও সি সমৃদ্ধ</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />উচ্চ আঁশযুক্ত ও হজমে সহায়ক</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />অ্যান্টিঅক্সিডেন্টে ভরপুর</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm">অর্ডার দিন</button>
                    <button className="flex-1 bg-amber-500 text-white py-2.5 rounded-xl font-bold text-sm">রেসিপি দেখুন</button>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-100 text-center">
                <button onClick={handleClosePopup} className="text-xs text-gray-400 hover:text-gray-600 underline">একবারে বন্ধ করুন (পুনরায় দেখাবে না)</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </section>
  );
};

export default Hero;