import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sigin from './pages/Sigin' 
import Dashboard from './pages/Dashboard'
import Pricing from './pages/Pricing'
import Contact from "./pages/Contact"
import Docs from './pages/Docs'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Sigin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/docs' element={<Docs />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
