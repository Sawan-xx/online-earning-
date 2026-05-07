import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import QuickEarn from './pages/QuickEarn'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Payment from './components/Payment';


function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quick-earn" element={<QuickEarn />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" component={Payment} />

        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
