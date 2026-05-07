import { motion } from 'framer-motion'
import CategoriesSection from '../components/CategoriesSection'
import TrendingSection from '../components/TrendingSection'

export default function HomePage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px] -z-10"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] -z-10"></div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 mb-6"
                >
                    Find the Best Online <br />Earning Method for You
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10"
                >
                    Discover curated earning opportunities based on your skills, time, and goals. Your journey to financial freedom starts here.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-violet-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-violet-600/20 hover:bg-violet-700 transition"
                >
                    Start Your Journey
                </motion.button>
            </div>
            <CategoriesSection />
            <TrendingSection />
        </>
    )
}
