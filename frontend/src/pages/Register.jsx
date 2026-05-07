import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Asterisk, Loader2 } from 'lucide-react'
import api from '../api'

export default function Register() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        fullName: '', email: '', password: '', confirmPassword: '',
        age: '', gender: '', currentStatus: 'Student', skills: '',
        dailyFreeTime: '2 hours', incomeGoal: '', investmentBudget: 'Zero'
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!")
            return
        }

        setLoading(true)
        setError('')
        try {
            // 1. Create account
            await api.post('auth/register/', {
                email: formData.email,
                password: formData.password,
                full_name: formData.fullName,
                age: formData.age,
                current_status: formData.currentStatus,
                skills: formData.skills,
                daily_free_time: formData.dailyFreeTime,
                investment_budget: formData.investmentBudget
            })

            // 2. Login to get token
            const loginRes = await api.post('auth/login/', { email: formData.email, password: formData.password })
            localStorage.setItem('access_token', loginRes.data.access)
            localStorage.setItem('refresh_token', loginRes.data.refresh)

            // 3. Generate suggestions using AI endpoint
            await api.post('generate-suggestions/')

            // 4. Redirect to dashboard
            navigate('/dashboard')
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.email?.[0] || 'An error occurred during registration.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-slate-800 relative overflow-hidden">

                {loading && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 animate-spin text-violet-600 mb-4" />
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Analyzing your profile via AI...</p>
                        <p className="text-slate-500 text-sm">Generating your personalized earning blueprints</p>
                    </div>
                )}

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h2>
                    <span className="text-sm font-medium text-violet-600 bg-violet-100 dark:bg-violet-900/30 px-3 py-1 rounded-full">Step {step} of 2</span>
                </div>

                {error && <div className="mb-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-xl text-center text-sm font-medium">{error}</div>}

                <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); setStep(2) }} className="space-y-6">
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-300">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                                <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Age</label>
                                <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500" placeholder="e.g. 24" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
                                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
                                <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500" placeholder="••••••••" />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right duration-300">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Status</label>
                                <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500">
                                    <option>Student</option>
                                    <option>Working Professional</option>
                                    <option>Freelancer</option>
                                    <option>Business Owner</option>
                                    <option>Housewife</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">What skills do you have?</label>
                                <input name="skills" value={formData.skills} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white" placeholder="e.g. Writing, Video Editing, Coding" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Daily Free Time</label>
                                <select name="dailyFreeTime" value={formData.dailyFreeTime} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500">
                                    <option>1-2 hours</option>
                                    <option>3-4 hours</option>
                                    <option>5+ hours</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Investment Budget</label>
                                <select name="investmentBudget" value={formData.investmentBudget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500">
                                    <option>Zero</option>
                                    <option>Low ($10-$50)</option>
                                    <option>Medium ($50-$200)</option>
                                    <option>High ($200+)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                        {step > 1 ? (
                            <button type="button" onClick={() => setStep(1)} className="px-6 py-2 text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
                                Back
                            </button>
                        ) : <div></div>}

                        <button type="submit" disabled={loading} className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50">
                            {step === 1 ? 'Next Step' : (loading ? 'Processing...' : 'Complete & Generate Blueprint')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
