import { Link } from 'react-router-dom'
import { useResumeContext } from '../context/ResumeContext'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const Navbar = ({
  handleModal,
  handleLoginModal,
}: {
  handleModal: () => void
  handleLoginModal: () => void
}) => {
  const { user, handleLogout } = useResumeContext()
  return (
    <div className="absolute top-0 left-0 z-10 opacity-100 h-20 shadow-md shadow-slate-950/20 w-full ">
      <nav className="h-full flex items-center justify-between max-w-6xl px-4 mx-auto">
        <div className="flex items-center gap-2 w-1/2">
          <Link to="/">
            <img
              className="h-12 object-cover"
              src="https://cdn-icons-png.flaticon.com/128/9119/9119108.png"
              alt="/logo"
            />
          </Link>
          <div className="flex items-center gap-2">
            <Tippy content="Create Resume">
              <Link
                className="font-semibold backdrop-blur hover:bg-slate-900/20 cursor-pointer backdrop-filter px-4 py-0.5 rounded-xl duration-300 ease-in text-sm md:text-lg"
                to={`/create-resume`}
              >
                Create
              </Link>
            </Tippy>
            <Tippy content="Generate Resume">
              <Link
                className="font-semibold backdrop-blur hover:bg-slate-900/20 cursor-pointer backdrop-filter px-4 py-0.5 rounded-xl duration-300 ease-in text-sm md:text-lg"
                to={`/generate-resume`}
              >
                Generate&nbsp;
              </Link>
            </Tippy>
            <Tippy content="View Resume">
              <div
                onClick={handleModal}
                className="font-semibold hover:bg-slate-900/20 cursor-pointer backdrop-blur backdrop-filter px-4 py-0.5 rounded-xl duration-300 ease-in text-sm md:text-lg"
              >
                View&nbsp;
              </div>
            </Tippy>
          </div>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <h4 className="text-sm hidden md:block font-bold capitalize">
              Welcome&nbsp;
              <span className="uppercase text-slate-100 bg-slate-950/40 px-2 py-0.5 text-sx md:px-4 md:py-1 rounded-sm">
                {user.username}
              </span>
            </h4>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1.5 rounded-md text-xs sm:text-sm text-slate-200 hover:bg-slate-900 duration-500 ease-in"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-cyan-500 px-4 py-1.5 rounded-md text-sm text-slate-200 hover:bg-slate-900 duration-500 ease-in cursor-pointer">
            <span onClick={handleLoginModal}>Login</span>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
