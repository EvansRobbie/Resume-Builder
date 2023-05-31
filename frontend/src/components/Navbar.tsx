import {Link} from 'react-router-dom'

const Navbar = () => {
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
                </div>
            </div>
            <div>
                <Link to={`/`}>Login</Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar