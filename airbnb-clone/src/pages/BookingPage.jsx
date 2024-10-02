import { useParams } from "react-router-dom"
import AccountNav from "../components/AccountNav"
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import { CalendarDaysIcon, UserIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { differenceInCalendarDays, format } from "date-fns";
import PlaceGallery from "../components/PlaceGallery";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    axios.get('/bookings/' + id)
      .then(({data}) => {
        setBooking(data);
      });
  }, [id]);
  if (!booking) {
    return '';
  }
  return (
    <div>
      <AccountNav />
      <div className="my-8">
        <h1 className="text-2xl font-medium">{booking.place.title}</h1>
        <AddressLink place={booking.place}/>
        <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
          <h2 className="font-bold">Your booking information</h2>
          <div className="relative flex flex-col gap-2 border-t border-gray-500 mt-2 py-2">
            <div className="flex gap-1 items-center">
              <UserIcon className="w-6 h-6"/>
              {booking.name}
            </div>
            <div className="flex gap-1 items-center">
              <PhoneIcon className="w-6 h-6"/>
              {booking.phone}
            </div>
            <div className="flex gap-1 items-center">
              <CalendarDaysIcon className="w-6 h-6"/>
              {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
            </div>
            <div className="absolute right-0 bottom-0 flex gap-4 justify-center items-center">
              <div className="flex flex-col items-center gap-1 bg-black py-4 w-32 rounded-2xl text-white justify-center">
                <span>Total nights</span>
                <span className="text-xl font-bold">{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}</span> 
              </div>
              <div className="flex flex-col items-center gap-1 bg-primary py-4 w-32 rounded-2xl text-white justify-center">
                <span>Total price</span>
                <span className="text-xl font-bold">${booking.price}</span>
              </div>
            </div>
          </div>
        </div>
        <PlaceGallery place={booking.place}/>
      </div>
    </div>
  )
}

export default BookingPage