import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiUser, FiPhone, FiMapPin, FiPackage, FiCreditCard, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlinePayment } from 'react-icons/md';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    product: 'fresh-pumpkin',
    quantity: 2,
    payment: 'cash',
    delivery: 'standard'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const products = [
    { id: 'fresh-pumpkin', name: 'তাজা মিষ্টি কুমড়া', price: 60, unit: 'কেজি', image: '🎃' },
    { id: 'organic-pumpkin', name: 'অর্গানিক মিষ্টি কুমড়া', price: 80, unit: 'কেজি', image: '🌱' },
    { id: 'pumpkin-slice', name: 'কাটা মিষ্টি কুমড়া', price: 35, unit: 'পিস', image: '🔪' },
    { id: 'special-pack', name: 'স্পেশাল প্যাক', price: 200, unit: 'প্যাক', image: '🎁' },
  ];

  const deliveryOptions = [
    { id: 'standard', name: 'স্ট্যান্ডার্ড ডেলিভারি', price: 50, days: '৩-৪ দিন', icon: <TbTruckDelivery /> },
    { id: 'express', name: 'এক্সপ্রেস ডেলিভারি', price: 100, days: '১-২ দিন', icon: <FiPackage /> },
    { id: 'pickup', name: 'পিক আপ', price: 0, days: 'তাত্ক্ষণিক', icon: <FiUser /> },
  ];

  const calculateTotal = () => {
    const product = products.find(p => p.id === formData.product);
    const delivery = deliveryOptions.find(d => d.id === formData.delivery);
    return (product.price * formData.quantity) + delivery.price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setOrderPlaced(true);
    
    // Show success and redirect
    setTimeout(() => {
      navigate('/order-confirmation');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            🎉
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent mb-4">
            অর্ডার সফল!
          </h1>
          <p className="text-emerald-700 text-lg mb-8">
            আপনার অর্ডারটি গ্রহণ করা হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
          </p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-6" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-8 px-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <FiShoppingBag className="text-xl" />
            <h1 className="text-3xl font-bold">মিষ্টি কুমড়া অর্ডার করুন</h1>
          </div>
          <p className="text-emerald-700/80 text-lg max-w-2xl mx-auto">
            তাজা ও পুষ্টিগুণে ভরপুর মিষ্টি কুমড়া আপনার ঠিকানায় পৌঁছে দেওয়া হবে
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information Card */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6">
                <div className="flex items-center gap-3 text-white">
                  <FiUser className="text-2xl" />
                  <h2 className="text-2xl font-bold">গ্রাহক তথ্য</h2>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-emerald-700 font-semibold mb-2">
                    <FiUser className="group-focus-within:text-emerald-600 transition-colors" />
                    পূর্ণ নাম
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-white"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                  />
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-emerald-700 font-semibold mb-2">
                    <FiPhone className="group-focus-within:text-emerald-600 transition-colors" />
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-white"
                    placeholder="০১XXXXXXXXX"
                  />
                </div>

                {/* Address Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-emerald-700 font-semibold mb-2">
                    <FiMapPin className="group-focus-within:text-emerald-600 transition-colors" />
                    সম্পূর্ণ ঠিকানা
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-white resize-none"
                    placeholder="বাড়ি নম্বর, রাস্তা, এলাকা, জেলা"
                  />
                </div>
              </form>
            </motion.div>

            {/* Product Selection Card */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
                <div className="flex items-center gap-3 text-white">
                  <FiPackage className="text-2xl" />
                  <h2 className="text-2xl font-bold">পণ্য নির্বাচন</h2>
                </div>
              </div>

              <div className="p-6">
                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${formData.product === product.id ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-100 hover:border-emerald-300'}`}
                      onClick={() => setFormData({...formData, product: product.id})}
                    >
                      {formData.product === product.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                          <FiCheck />
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{product.image}</span>
                        <div>
                          <h3 className="font-bold text-emerald-800">{product.name}</h3>
                          <p className="text-emerald-600">{product.price}৳/{product.unit}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quantity Selector */}
                <div className="bg-emerald-50 rounded-xl p-4">
                  <label className="block text-emerald-700 font-semibold mb-3">পরিমাণ</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})}
                      className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-emerald-800 min-w-[60px] text-center">
                      {formData.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, quantity: formData.quantity + 1})}
                      className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-emerald-600 ml-auto">
                      {formData.quantity} {products.find(p => p.id === formData.product)?.unit}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Delivery Options Card */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex items-center gap-3 text-white">
                  <TbTruckDelivery className="text-2xl" />
                  <h2 className="text-2xl font-bold">ডেলিভারি অপশন</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {deliveryOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.delivery === option.id ? 'border-blue-500 bg-blue-50' : 'border-blue-100 hover:border-blue-300'}`}
                    onClick={() => setFormData({...formData, delivery: option.id})}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${formData.delivery === option.id ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
                        {option.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-800">{option.name}</h3>
                        <p className="text-blue-600 text-sm">{option.days} ডেলিভারি</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-800">{option.price}৳</p>
                      {formData.delivery === option.id && (
                        <div className="text-sm text-green-600 font-semibold">✓ নির্বাচিত</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Payment Method Card */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
                <div className="flex items-center gap-3 text-white">
                  <MdOutlinePayment className="text-2xl" />
                  <h2 className="text-2xl font-bold">পেমেন্ট মাধ্যম</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'cash', name: 'ক্যাশ অন ডেলিভারি', icon: '💵', color: 'from-green-500 to-green-600' },
                    { id: 'bkash', name: 'bKash', icon: '📱', color: 'from-pink-500 to-pink-600' },
                    { id: 'nagad', name: 'Nagad', icon: '💳', color: 'from-purple-500 to-purple-600' },
                    { id: 'card', name: 'কার্ড', icon: '💳', color: 'from-blue-500 to-blue-600' },
                  ].map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative cursor-pointer rounded-xl p-4 transition-all ${formData.payment === method.id ? 'ring-2 ring-purple-500' : 'hover:ring-1 hover:ring-purple-300'}`}
                      onClick={() => setFormData({...formData, payment: method.id})}
                    >
                      {formData.payment === method.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white">
                          <FiCheck />
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-bold text-purple-800">{method.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-8">
            {/* Order Summary Card */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 overflow-hidden sticky top-8"
            >
              <div className="bg-gradient-to-r from-emerald-600 to-amber-600 p-6">
                <h3 className="text-2xl font-bold text-white">অর্ডার সারাংশ</h3>
              </div>

              <div className="p-6">
                {/* Product Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {products.find(p => p.id === formData.product)?.image}
                      </span>
                      <div>
                        <h4 className="font-bold text-emerald-800">
                          {products.find(p => p.id === formData.product)?.name}
                        </h4>
                        <p className="text-sm text-emerald-600">{formData.quantity} × {products.find(p => p.id === formData.product)?.price}৳</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-800">
                      {products.find(p => p.id === formData.product)?.price * formData.quantity}৳
                    </span>
                  </div>

                  {/* Delivery Charge */}
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <TbTruckDelivery className="text-blue-600 text-xl" />
                      <div>
                        <h4 className="font-bold text-blue-800">
                          {deliveryOptions.find(d => d.id === formData.delivery)?.name}
                        </h4>
                        <p className="text-sm text-blue-600">{deliveryOptions.find(d => d.id === formData.delivery)?.days}</p>
                      </div>
                    </div>
                    <span className="font-bold text-blue-800">
                      {deliveryOptions.find(d => d.id === formData.delivery)?.price}৳
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-emerald-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-700 font-semibold">সাবটোটাল</span>
                    <span className="text-emerald-700">
                      {products.find(p => p.id === formData.product)?.price * formData.quantity}৳
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-700 font-semibold">ডেলিভারি চার্জ</span>
                    <span className="text-blue-700">
                      {deliveryOptions.find(d => d.id === formData.delivery)?.price}৳
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-emerald-300">
                    <span className="text-emerald-800">মোট পরিশোধযোগ্য</span>
                    <span className="text-emerald-800">{calculateTotal()}৳</span>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      প্রক্রিয়াকরণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <FiShoppingBag />
                      অর্ডার কনফার্ম করুন
                    </>
                  )}
                </motion.button>

                {/* Back to Home */}
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-800 mt-4 transition-colors group"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  আরও পণ্য দেখুন
                </Link>
              </div>
            </motion.div>

            {/* Security & Guarantee Card */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-emerald-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg"
            >
              <h4 className="font-bold text-emerald-800 mb-4 text-center">গ্যারান্টি ও নিরাপত্তা</h4>
              <div className="space-y-3">
                {[
                  { icon: '🔒', text: '১০০% নিরাপদ পেমেন্ট' },
                  { icon: '🚚', text: '১-৪ দিনের মধ্যে ডেলিভারি' },
                  { icon: '💰', text: 'ক্যাশ অন ডেলিভারি উপলব্ধ' },
                  { icon: '🔄', text: '৭ দিনের রিটার্ন পলিসি' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-emerald-700">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;