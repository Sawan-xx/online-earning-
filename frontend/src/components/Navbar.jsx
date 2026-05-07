import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                            EarnGuide
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/quick-earn" className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors">Quick Earn</Link>
                        <Link to="/about" className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors">About Admin</Link>
                        <div className="flex items-center space-x-4 pl-4 border-l border-slate-300 dark:border-slate-700">
                            <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-violet-600 font-medium transition-colors">Login</Link>
                            <Link to="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-violet-500/30"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
