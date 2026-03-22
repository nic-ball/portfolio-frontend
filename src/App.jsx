import { useState, useEffect } from 'react'
import { getProjects } from './services/api'
import CppDemo from './components/CppDemo'
import ContactForm from './components/ContactForm'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProjects()
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch projects')
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center p-10">Loading...</div>
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-7x1 mx-auto space-y-12">

        <div className="text-center border-b pb-8">
          <h1 className="text 6x1 font-bold text-gray-800 mb-8 border-b pb-4">
            Developer Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A full-stack showcase of projects featuring C++ WebAssembly, Vite React and RESTful APIs using Python/Django.
          </p>
        </div>

        {/* Projects Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col mt-8">
                <div className="h-48 bg-slate-200 overflow-hidden relative">
                  <img
                    src={project.image_url || 'https://via.placeholder.com/400x300'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow whitespace-pre-wrap">
                    {project.description}
                  </p>
                  <div className="mb-6">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-2 rounded-full font-bold">
                      {project.technologies}
                    </span>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    {project.live_link && project.live_link.trim() !== "" ? (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-bold text-sm transition"
                      >
                        Live Demo &rarr;
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm italic">No live demo</span>
                    )}
                    <a
                      href={project.github_link}
                      target="_blank"
                      className="text-slate-800 hover:text-slate-500 transition-colors"
                      title="View Source Code"
                    >
                      <svg height="28" width="28" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT COLUMN: C++ Demo */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2-xl font-bold text-gray-800 mb-4">Interactive Demo</h2>
            <div className="w-full">
              <CppDemo />
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Me</h2>
            <div className="w-full">
              <ContactForm />
            </div>
          </div>

        </section>
      </div>
    </div>
  )
}

export default App
