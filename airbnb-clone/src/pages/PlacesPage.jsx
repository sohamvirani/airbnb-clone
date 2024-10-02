import { Link } from "react-router-dom"
import { PlusIcon } from "@heroicons/react/24/outline"
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data);
    })
  }, [])
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
          <PlusIcon className="w-6 h-6"/>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 && places.map((place) => {
          return (
            <Link to={'/account/places/' + place._id} key={place._id} className="flex cursor-pointer gap-4 my-4 overflow-hidden bg-gray-200 rounded-2xl">
              <div className="max-w-48 w-full bg-gray-300 grow shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink py-4 pr-8">
                <h2 className="font-bold text-xl">{place.title}</h2>
                <h3>{place.address} (<span className="font-semibold">${place.price}</span> per night)</h3>
                <p className="text-sm mt-2 line-clamp-6 text-justify">{place.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default PlacesPage