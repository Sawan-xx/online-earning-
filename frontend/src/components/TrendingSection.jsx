import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const trendingItems = [
    { title: 'YouTube Shorts Automation', potential: '$1K - $5K/mo', type: 'Content Creation' },
    { title: 'Freelance Copywriting', potential: '$500 - $3K/mo', type: 'Freelancing' },
    { title: 'AI Faceless Theme Pages', potential: '$300 - $2K/mo', type: 'Social Media' },
]

export default function TrendingSection() {
    return (
        <section className="py-20 px-4 bg-slate-100 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center space-x-3 mb-10">
                    <Flame className="w-8 h-8 text-orange-500" />
                    <h2 className="text-3xl font-bold">Trending Earning Methods</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trendingItems.map((item, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            key={i}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-violet-500 transition-colors"
                        >
                            <div className="text-sm text-violet-600 dark:text-violet-400 font-medium mb-2">{item.type}</div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <div className="flex items-center text-slate-500 dark:text-slate-400">
                                <span>Potential:</span>
                                <strong className="ml-2 text-slate-900 dark:text-white">{item.potential}</strong>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
