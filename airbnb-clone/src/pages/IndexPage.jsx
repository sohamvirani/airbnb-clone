import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const IndexPage = () => {

  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places')
      .then((response) => {
        setPlaces(response.data);
      })
  }, []);

  return (
    <div className="mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
        places.length > 0 && places.map((place) => {
          return (
            <Link to={'/place/' + place._id} key={place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {
                  place.photos?.[0] && (
                    <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:8080/uploads/' + place.photos?.[0]} alt={place.title} />
                  )
                }
              </div>
              <h3 className="font-semibold">{place.address}</h3>
              <h2 className="text-sm">{place.title}</h2>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default IndexPage