import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Products from '../Components/Products';
import BlankLayout from '../layouts/BlankLayout';
import CheckoutPage from '../pages/CheckoutPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Pages WITH Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Products />} />
      </Route>

      {/* Pages WITHOUT Navbar */}
      <Route element={<BlankLayout />}>
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
