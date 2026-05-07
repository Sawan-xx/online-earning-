import { useState, useEffect } from 'react'
import { ExternalLink, CheckCircle, Loader2 } from 'lucide-react'
import api from '../api'

export default function QuickEarn() {
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('quick-earn/')
            .then(res => {
                setLinks(res.data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-[80vh] py-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-500 mb-4">
                    Quick Earn Directory
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">Verified links to start earning money today.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-violet-600" />
                </div>
            ) : links.length === 0 ? (
                <div className="text-center text-slate-500">No earning links available at the moment. Please check back later.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {links.map((link) => (
                        <div key={link.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-500 transition-all relative group">
                            {link.is_verified && (
                                <span className="absolute top-4 right-4 text-green-500 flex items-center space-x-1 text-xs font-semibold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Verified</span>
                                </span>
                            )}
                            <div className="text-sm text-violet-600 dark:text-violet-400 font-medium mb-1">{link.earning_type} • {link.platform_name}</div>
                            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{link.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">{link.short_description}</p>

                            <div className="mb-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                                    <span>Earning Potential</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{link.earning_potential}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                                    <span>Beginner Friendly</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{link.beginner_friendly_level}</span>
                                </div>
                            </div>

                            <a href={link.direct_link} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-xl font-bold hover:bg-violet-600 dark:hover:bg-violet-600 transition-colors">
                                Start Earning
                                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
