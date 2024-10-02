import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import { icons } from "../common/PerkIcons";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`)
      .then((response) => {
        setPlace(response.data);
      });
  }, [id]);

  if (!place) {
    return '';
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl font-medium">{place.title}</h1>
      <AddressLink place={place} />
      <div className="grid grid-cols-5 gap-8">
        <PlaceGallery place={place} />
        <div className="col-span-2 flex flex-col">
          <div>
            <div className="my-4 text-justify">
              <h2 className="font-semibold text-2xl mb-2">About this place</h2>
              {place.description}
            </div>
          </div>
          <div className="flex-1">
            <BookingWidget place={place} />
          </div>
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 mt-8 pt-8 pb-2 border-y">
        <h2 className="font-semibold text-2xl mb-4">Extra information</h2>
        <div className="flex flex-col gap-2 mb-4 text-gray-700">
          <span className="font-semibold text-lg flex gap-1 items-center">
            Check in & out time
          </span>
          <div>
            Check in: {place.checkIn}h<br />
            Check out: {place.checkOut}h<br />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4 text-gray-700">
          <span className="text-lg flex gap-1 items-center">
            <span className="font-semibold">Number of guest:</span> {place.maxGuests} {place.maxGuests > 1 ? 'people' : 'person'}
          </span>
        </div>
        <div className="flex flex-col gap-2 mb-4 text-gray-700">
          <span className="font-semibold text-lg flex gap-1 items-center">
            What this place offers
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {
              icons.map((item, index) => {
                if (place?.perks.includes(item.perk)) {
                  return (
                    <div key={index} className="flex gap-1 items-center">
                      <item.icon className="w-6 h-6"/>
                      <span>{item.name}</span>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4 text-gray-700">
          <span className="font-semibold text-lg flex gap-1 items-center">
            Other information
          </span>
          <div>
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlacePage