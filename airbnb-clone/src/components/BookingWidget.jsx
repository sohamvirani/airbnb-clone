import { useContext, useEffect, useState } from "react"
import { UserIcon, CalendarDaysIcon } from "@heroicons/react/24/outline"
import { differenceInCalendarDays } from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../common/UserContext";

const BookingWidget = ({place}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');
  const {user} = useContext(UserContext);
  let numberOfNights = 0;

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  const bookThisPlace = async () => {
    const data = {
      checkIn,
      checkOut,
      numberOfGuests: numberOfGuest,
      name,
      phone: mobile,
      place: place._id,
      price: numberOfNights * place.price
    }
    const response = await axios.post('/bookings', data);
    const bookingId = response.data;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white mt-4 shadow-md p-4 rounded-2xl">
      <div className="text-2xl text-center font-bold">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="grid grid-cols-2">
          <div className="py-3 px-4">
            <label className="flex items-center gap-1 font-bold">
              <CalendarDaysIcon className="w-5 h-5"/>
              Check in
            </label>
            <input value={checkIn} onChange={(event) => setCheckIn(event.target.value)} type="date" />
          </div>
          <div className="py-3 px-4 border-l">
            <label className="flex items-center gap-1 font-bold">
              <CalendarDaysIcon className="w-5 h-5"/>
              Check out
            </label>
            <input value={checkOut} onChange={(event) => setCheckOut(event.target.value)} type="date" />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label className="flex items-center gap-1 font-bold">
            <UserIcon className="w-5 h-5"/>
            Number of guests
          </label>
          <input type="number" value={numberOfGuest} onChange={(event) => setNumberOfGuest(event.target.value)}/>
        </div>
        {
          numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label className="flex items-center gap-1">
                Your full name: 
              </label>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
              <label className="flex items-center gap-1">
                Phone number: 
              </label>
              <input type="tel" value={mobile} onChange={(event) => setMobile(event.target.value)}/>
            </div>
          )
        }
      </div>
      <button onClick={bookThisPlace} className="primary mt-4 font-medium">
        Reserve
        {
          numberOfNights > 0 && (
            <span> ({numberOfNights} Nights - ${numberOfNights * place.price})</span>
          )
        }
      </button>
    </div>
)
}

export default BookingWidget