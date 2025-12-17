import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Products from "../Components/Products";
import Testimonials from "../Components/Testimonials";
import Footer from "../Components/Footer";
import NextSection from "../Components/NextSection";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Hero></Hero>
      <Outlet />
      <Testimonials></Testimonials>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
