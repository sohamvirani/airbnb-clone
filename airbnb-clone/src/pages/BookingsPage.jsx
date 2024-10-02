import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import axios from 'axios'
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { CalendarDaysIcon, MoonIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings')
      .then(({data}) => {
        setBookings(data);
      });
  }, [])
  return (
    <div>
      <AccountNav />
      <div>
        {
          bookings?.length > 0 && bookings.map(booking => (
            <Link to={'/account/bookings/' + booking._id} key={booking._id} className="flex gap-4 my-4 bg-gray-200 rounded-2xl overflow-hidden">
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-2 grow pr-3">
                <h2 className="text-xl font-medium">{booking.place.title}</h2>
                <div className="flex flex-col gap-2 border-t border-gray-500 mt-2 py-2">
                  <div className="flex gap-1 items-center">
                    <CalendarDaysIcon className="w-6 h-6"/>
                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    <MoonIcon className="w-6 h-6" />
                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights 
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    <CurrencyDollarIcon className="w-6 h-6" />
                    ${booking.price}
                  </div>
                  <div className="text-gray-500 italic hover:underline hover:underline-offset-2 hover:text-gray-700">
                    Click for more information
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default BookingsPage