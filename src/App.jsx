import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/nav/Navbar';
import Hero from './components/hero/Hero';



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
    </>
  )
}
function App() {
return (
   <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
   </Router>
  )
}

export default App
