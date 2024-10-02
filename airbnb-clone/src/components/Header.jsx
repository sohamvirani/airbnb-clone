import { PaperAirplaneIcon, MagnifyingGlassIcon, Bars3Icon, UserIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../common/UserContext'

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <header className='flex justify-between'>
        <Link to={"/"} className='text-primary flex items-center gap-1'>
          <PaperAirplaneIcon className='-rotate-90 w-8 h-8'/>
          <span className='font-bold text-2xl'>airbnb</span>
        </Link>
        <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
          <div>Any where</div>
          <div className="border-l border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Any guests</div>
          <button className='bg-primary text-white px-2 rounded-full'>
            <MagnifyingGlassIcon  className='w-4 h-4'/>
          </button>
        </div>
        <Link to={user ? '/account' :'/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>
          <Bars3Icon className='h-6 w-6'/>
          <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
            <UserIcon className='w-6 h-6 relative top-1 fill-white'/>  
          </div>
          {
            !!user && (
              <div>
                {user.name}
              </div>
            )
          }
        </Link>
      </header>
    </div>
  )
}

export default Header