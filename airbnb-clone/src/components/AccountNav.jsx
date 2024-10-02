import { Link, useLocation } from 'react-router-dom';
import { UserIcon, ListBulletIcon, HomeModernIcon } from '@heroicons/react/24/outline';

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
    subpage = 'profile';
  }
  const linkClasses = (type = null) => {
      let classes = 'inline-flex gap-1 py-2 px-6 rounded-full ';
      if (type === subpage) {
        classes += 'bg-primary text-white';
      } else {
        classes += 'bg-gray-200'
      }
      return classes;
    }
  return (
    <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
      <Link className={linkClasses('profile')} to={'/account'}>
        <UserIcon className='w-6 h-6'/>
        My profile
      </Link>
      <Link className={linkClasses('bookings')} to={'/account/bookings'}>
        <ListBulletIcon className='w-6 h-6'/>
        My bookings
      </Link>
      <Link className={linkClasses('places')} to={'/account/places'}>
        <HomeModernIcon className='w-6 h-6'/>
        My accomodations
      </Link>
    </nav>
  )
}


export default AccountNav