import {
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa'

export default function About() {
  return (
    <div className="min-h-[80vh] py-16 px-4 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]"></div>

        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">

          {/* Profile Image */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-violet-100 dark:border-violet-900/50 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1740252117012-bb53ad05e370?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <div className="text-violet-600 dark:text-violet-400 font-bold tracking-wider uppercase text-sm mb-2">
              Platform Founder & Mentor
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              Savan
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              I'm an online entrepreneur and digital marketer with years of experience
              building profitable online businesses and helping people earn online.
            </p>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                Core Expertise
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  'Affiliate Marketing',
                  'YouTube Automation',
                  'Freelancing',
                  'Digital Products',
                  'SEO'
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">

              <a
                href="#"
                target="_blank"

                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-violet-600 hover:text-white transition-all hover:scale-110"
              >
                <FaYoutube size={20} />
              </a>

              <a
                href="https://www.instagram.com/sawan__dhakse_/"
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-violet-600 hover:text-white transition-all hover:scale-110"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/sawan-dhakse/"
                target="_blank"

                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-violet-600 hover:text-white transition-all hover:scale-110"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://github.com/Sawan-xx"
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-violet-600 hover:text-white transition-all hover:scale-110"
              >
                <FaGithub size={20} />
              </a>

            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">

          <div className="flex items-center text-slate-600 dark:text-slate-400">
            <FaEnvelope className="mr-3" />
            <span>hello@earnguide.com</span>
          </div>

          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white transition-colors">
            Book 1-on-1 Mentorship
          </button>

        </div>
      </div>
    </div>
  )
}