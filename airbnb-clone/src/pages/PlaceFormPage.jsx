import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlaceFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get('/places/' + id).then(response => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhoto(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      });
    }
  }, [id]); 

  const inputHeader = (text) => {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    )
  }

  const inputDescription = (text) => {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    )
  }

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  const savePlace = async (event) => {
    event.preventDefault();
    const placeData = {
      title,
      address,
      photos: addedPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price,
      maxGuests
    }
    if (id) {
      axios.put('/places', {
        id, ...placeData
      });
    } else {
      await axios.post('/places', placeData);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place, it should be short and cachy as in advertisment.')}
        <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Title, for example: My lovely homestay"/>
        {preInput('Address', 'Address to this place')}
        <input value={address} onChange={(event) => setAddress(event.target.value)} type="text" placeholder="Address" />
        {preInput('Photos', 'More photos are better')}
        <PhotoUploader addedPhoto={addedPhoto} onChange={setAddedPhoto}/>
        {preInput('Description', 'Description of the place')}
        <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
        {preInput('Perks', 'Select all the perks of the place')}
        <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks}/>
        </div>
        {preInput('Extra information', 'House rules, etc')}
        <textarea value={extraInfo} onChange={(event) => setExtraInfo(event.target.value)}/>
        {preInput('Check in & out times, Max guests', 'Add check in and out times, remember to have some time for cleaning the room.')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} placeholder="11"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={maxGuests} onChange={(event) => setMaxGuests(event.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price $ per night</h3>
            <input type="number" value={price} onChange={(event) => setPrice(event.target.value)}/>
          </div>
        </div>
        <div>
          <button className="primary my-8">Save</button>
        </div>
      </form>
    </div>
  )
}

export default PlaceFormPage