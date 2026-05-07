import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await api.post('auth/login/', { email, password })
            localStorage.setItem('access_token', res.data.access)
            localStorage.setItem('refresh_token', res.data.refresh)
            navigate('/dashboard')
        } catch (err) {
            console.error(err)
            setError('Invalid credentials or you need to register.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
                <h2 className="text-3xl font-bold mb-2 text-center text-slate-900 dark:text-white">Welcome Back</h2>
                <p className="text-slate-500 text-center mb-8">Sign in to uncover new earning methods</p>

                {error && <div className="mb-4 text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-xl font-bold transition-colors">
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-6 text-center text-slate-500">
                    Don't have an account? <a href="/register" className="text-violet-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    )
}
