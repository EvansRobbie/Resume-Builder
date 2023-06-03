import {Link} from 'react-router-dom'
import { useResumeContext } from '../context/ResumeContext'

const Navbar = ({handleModal, handleLoginModal}:{handleModal:() => void, handleLoginModal:() => void}) => {
    const {user, handleLogout} = useResumeContext()
  return (
    <div className='absolute top-0 left-0 z-10 opacity-100 h-20 shadow-md shadow-slate-950/20 w-full '>
        <nav className='h-full flex items-center justify-between max-w-6xl mx-auto'>
            <div className='flex items-center justify-between w-1/2'>
                <Link to='/'>
                    <img className='h-12 object-cover' src="https://cdn-icons-png.flaticon.com/128/9119/9119108.png" alt="/logo" />
                </Link>
                <div>
                    <Link className='font-semibold backdrop-blur backdrop-filter px-4 py-0.5 rounded-xl hover:bg-slate-200/20 text-lg' to={`/create-resume`}>Create resume</Link>
                    <Link className='font-semibold backdrop-blur backdrop-filter px-4 py-0.5 rounded-xl hover:bg-slate-200/20 text-lg' to={`/`}>Generate resume</Link>
                    <div onClick={handleModal} className='font-semibold backdrop-blur backdrop-filter px-4 py-0.5 rounded-xl hover:bg-slate-200/20 text-lg' >View resume</div>
                </div>
            </div>
            {user? <div className='flex items-center gap-4'>
                <h4 className='text-sm font-bold capitalize'>Welcome back <span className='uppercase text-slate-100 bg-slate-950/40 px-4 py-1 rounded-sm'>{user.username}</span></h4>
                <button onClick={handleLogout} className='bg-red-500 px-4 py-1.5 rounded-md text-sm text-slate-200 hover:bg-slate-900 duration-500 ease-in'>Logout</button>
            </div>:
            <div className='bg-cyan-500 px-4 py-1.5 rounded-md text-sm text-slate-200 hover:bg-slate-900 duration-500 ease-in'>
                <span onClick={handleLoginModal}>Login</span>
            </div>
        }
        </nav>
    </div>
  )
}

export default Navbar