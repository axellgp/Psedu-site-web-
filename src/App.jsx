import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Booking from './pages/Booking'
import Reservations from './pages/Reservations'
import BookingCalendar from './pages/BookingCalendar'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'

import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { LogsProvider } from './context/LogsContext'

import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'

const PageShell = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    style={{ minHeight: '100%' }}
  >
    {children}
  </motion.div>
)

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <PageShell key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/reservation" element={<Booking />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/calendrier" element={<BookingCalendar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </PageShell>
    </AnimatePresence>
  )
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <BookingProvider>
          <LogsProvider>
            <Router
              basename="/Psedu-site-web-"
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <ScrollToTop />
              <div className="App">
                <Navbar />
                <main>
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4200,
                  style: {
                    background: 'rgba(9, 27, 43, 0.92)',
                    color: '#f7fbff',
                    border: '1px solid rgba(180, 224, 241, 0.16)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 22px 60px rgba(3, 16, 28, 0.36)',
                  },
                }}
              />
            </Router>
          </LogsProvider>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
