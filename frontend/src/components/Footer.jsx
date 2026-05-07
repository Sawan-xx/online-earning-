export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                        EarnGuide
                    </span>
                    <p className="text-slate-500 text-sm mt-2">© 2026 Online Earning Guide. All rights reserved.</p>
                </div>
                <div className="flex space-x-6 text-sm text-slate-600 dark:text-slate-400">
                    <a href="#" className="hover:text-violet-600 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-violet-600 transition">Terms of Service</a>
                    <a href="#" className="hover:text-violet-600 transition">Contact</a>
                </div>
            </div>
        </footer>
    )
}
