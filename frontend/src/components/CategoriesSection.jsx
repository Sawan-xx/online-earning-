import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Monitor, Briefcase, GraduationCap, Building2, Store, Video } from 'lucide-react'

const categories = [
    { name: 'Student', icon: <GraduationCap className="w-8 h-8" />, desc: 'Flexible side-hustles' },
    { name: 'Freelancer', icon: <Monitor className="w-8 h-8" />, desc: 'High-paying gigs' },
    { name: 'Job Holder', icon: <Briefcase className="w-8 h-8" />, desc: 'Passive income ideas' },
    { name: 'Business Owner', icon: <Building2 className="w-8 h-8" />, desc: 'Scale with AI' },
    { name: 'Housewife', icon: <Store className="w-8 h-8" />, desc: 'Work from home' },
    { name: 'Content Creator', icon: <Video className="w-8 h-8" />, desc: 'Monetize audience' },
]

export default function CategoriesSection() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-500 mb-4">
                        Who Are You?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Select your profile to get personalized recommendations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all cursor-pointer group"
                        >
                            <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {cat.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{cat.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400">{cat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
