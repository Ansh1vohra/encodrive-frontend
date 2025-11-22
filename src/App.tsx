import { Route, Routes } from 'react-router-dom'
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>Encodrive - End-to-End File Encryption SaaS</title>
        <meta name="description" content="Easily add end-to-end encrypted file storage to your app. Developer-first, scalable, and secure." />
        <meta name="keywords" content="Encodrive, file encryption, SaaS, secure file storage, developer" />
        <meta property="og:title" content="Encodrive" />
        <meta property="og:description" content="Easily add end-to-end encrypted file storage to your app." />
        <meta property="og:image" content="/logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.encodrive.com/" />
      </Helmet>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Sigin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/docs' element={<Docs />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
