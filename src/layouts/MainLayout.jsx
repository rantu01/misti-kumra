import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Products from "../Components/Products";
import Testimonials from "../Components/Testimonials";
import Footer from "../Components/Footer";
import NextSection from "../Components/NextSection";
import Home from "../Home/Home";

const MainLayout = () => {
  return (
    <>
    <div className="bg-gray-100"><Home></Home></div>
      
    </>
  );
};

export default MainLayout;
