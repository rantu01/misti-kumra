import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Products from '../Components/Products'
import Testimonials from '../Components/Testimonials'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero />
        <Products />
        <Testimonials />
        <Footer />
    </div>
  )
}

export default Home