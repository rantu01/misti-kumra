import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">মিষ্টি কুমড়া</h3>
            <p className="text-green-200">
              প্রকৃতির উপহার, স্বাস্থ্যের বন্ধু
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-yellow-300">হোম</a></li>
              <li><a href="#products" className="hover:text-yellow-300">পণ্য</a></li>
              <li><a href="#contact" className="hover:text-yellow-300">যোগাযোগ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">যোগাযোগ</h4>
            <p className="text-green-200">📞 ০১৭১২-৩৪৫৬৭৮</p>
            <p className="text-green-200">📧 info@mistikumra.com</p>
            <p className="text-green-200">📍 ঢাকা, বাংলাদেশ</p>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-300">
          <p>© ২০২৪ মিষ্টি কুমড়া। সকল স্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
