import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/nav/Navbar';
import Hero from './components/hero/Hero';
import Services from './components/services/Services';
import AboutUs from './components/about/AboutUs';
import Team from './components/team/Team';
import Testimonials from './components/testimonial/Testimonials';
import Booking from './components/booking/Booking';



function Home(){
const location = useLocation()

useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])


  return(
    <>
    <Hero/>
    <Services/>
    <Testimonials/>
    <Booking/>
    </>
  )
}
function App() {
return (
   <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<AboutUs />} />
    <Route path="team" element={<Team />} />
    </Routes>
   </Router>
  )
}

export default App
