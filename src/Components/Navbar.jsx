import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-green-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
          <span className="text-2xl font-bold">মিষ্টি কুমড়া</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-yellow-300">হোম</a>
          <a href="#products" className="hover:text-yellow-300">পণ্য</a>
          <a href="#about" className="hover:text-yellow-300">সম্পর্কে</a>
          <a href="#contact" className="hover:text-yellow-300">যোগাযোগ</a>
        </div>
        
        <button className="bg-yellow-500 text-green-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400">
          অর্ডার করুন
        </button>
      </div>
    </nav>
  );
};

export default Navbar;