import { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, Clock, DollarSign, Wallet, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Dashboard() {
    const [suggestions, setSuggestions] = useState([])
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

useEffect(() => {
    // Check authentication
    if (!localStorage.getItem('access_token')) {
        navigate('/login');
        return;
    }

    // Fetch user profile first
    api.get('auth/profile/').then((profileRes) => {
        setProfile(profileRes.data);

        // After profile is set, fetch suggestions
        api.post('generate-suggestions/').then((res) => {
            setSuggestions(res.data);
        }).catch(err => {
            console.error('Failed to fetch suggestions', err);
        });
    }).catch((err) => {
        console.error('Failed to fetch profile', err);
        if (err.response?.status === 401) {
            navigate('/login');
        }
    }).finally(() => {
        setLoading(false);
    });
}, [navigate]);



    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-violet-600" />
            </div>
        )
    }

    return (
        <div className="min-h-[80vh] py-12 px-4 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
                    Hello, {profile?.full_name || 'User'}
                    <span className="ml-3 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm rounded-full">
                        {profile?.current_status || 'Member'}
                    </span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Here are your personalized earning blueprints based on your AI profile analysis.</p>
            </div>

            {suggestions.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-slate-500 mb-4">No suggestions found. Let's analyze your profile again.</p>
                    <button
                        onClick={() => {
                            setLoading(true)
                            api.post('generate-suggestions/').then(() => {
                                window.location.reload()
                            })
                        }}
                        className="bg-violet-600 text-white px-6 py-2 rounded-xl"
                    >
                        Regenerate Suggestions
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {suggestions.map((sug, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            key={sug.id}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-violet-200 dark:border-violet-900/50 shadow-xl shadow-violet-500/5 relative overflow-hidden"
                        >
                            {i === 0 && <div className="absolute top-0 right-0 bg-gradient-to-l from-violet-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md flex items-center"><Sparkles className="w-3 h-3 mr-1" /> Top Match</div>}

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 pr-20">{sug.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm italic">{sug.description}</p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <Clock className="w-4 h-4 mr-2 text-violet-500" />
                                    {sug.time_required}
                                </div>
                                <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                                    {sug.earning_potential}
                                </div>
                                <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <Wallet className="w-4 h-4 mr-2 text-blue-500" />
                                    Investment: {sug.investment_needed}
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Step-by-Step Guide</h3>
                                <ul className="space-y-2">
                                    {sug.step_by_step_guide.split('\n').filter(Boolean).map((step, idx) => (
                                        <li key={idx} className="flex items-start text-slate-600 dark:text-slate-400 text-sm">
                                            <span className="w-5 h-5 flex items-center justify-center bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full text-xs font-bold mr-3 shrink-0 mt-0.5">{idx + 1}</span>
                                            {step.replace(/^\d+\.\s*/, '')}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl flex items-center justify-center hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white transition-colors group">
                                Start This Blueprint
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
