import { useState } from "react"
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PlaceGallery = ({place}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black min-h-screen">
        <div className="bg-black p-8 grid gap-8">
          <div>
            <h2 className="mr-48 text-3xl text-white">Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className="fixed right-8 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-white shadow-md">
              <XMarkIcon className="w-6 h-6"/>
              Close photos
            </button>
          </div>
          {
            place?.photos?.length > 0 && place.photos.map(photo => (
              <div key={photo}>
                <img className="max-w-[1000px] w-full mx-auto" src={'http://localhost:8080/uploads/' + photo} alt="" />
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <div className="relative col-span-3 container mx-auto max-w-[1200px]">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img onClick={() => setShowAllPhotos(!showAllPhotos)} className="aspect-square w-full object-cover cursor-pointer h-full" src={'http://localhost:8080/uploads/' + place.photos[0]} alt="" />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img onClick={() => setShowAllPhotos(!showAllPhotos)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:8080/uploads/' + place.photos[1]} alt="" />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img onClick={() => setShowAllPhotos(!showAllPhotos)} className="aspect-square object-cover cursor-pointer relative top-2" src={'http://localhost:8080/uploads/' + place.photos[2]} alt="" />
            )}
          </div>
        </div>
      </div>
      <button onClick={() => setShowAllPhotos(!showAllPhotos)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white shadow-md rounded-2xl">
        <PhotoIcon className="w-6 h-6"/>
        Show more photos
      </button>
    </div>
  )
}

export default PlaceGallery