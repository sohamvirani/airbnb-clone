import axios from "axios";
import { useState } from "react";
import { CloudArrowUpIcon, TrashIcon, StarIcon } from "@heroicons/react/24/outline"

const PhotoUploader = ({addedPhoto, onChange}) => {
  const [photoLink, setPhotoLink] = useState('');

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const {data: filename} = await axios.post('/upload-by-link', {
      link: photoLink
    });
    onChange([...addedPhoto, filename]);
    setPhotoLink('');
  }

  const uploadPhoto = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-type': 'multipart/form-data'}
    })
      .then((response) => {
        const { data: filename } = response;
        onChange([...addedPhoto, ...filename]);
      });
  }

  const removePhoto = (event, fileName) => {
    event.preventDefault();
    onChange([...addedPhoto.filter((photo) => {
      return photo !== fileName
    })]);
  }

  const selectAsMainPhoto = (event, filename) => {
    event.preventDefault();
    const addedPhotoWithoutSelected = addedPhoto.filter(photo => photo !== filename);
    const newAddedPhotos = [filename, ...addedPhotoWithoutSelected];
    onChange(newAddedPhotos);
  }

  return (
    <>
      <div className="flex gap-2">
        <input value={photoLink} onChange={(event) => setPhotoLink(event.target.value)} type="text" placeholder="Add using a link (.jpg)" />
        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
      </div>
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhoto.length > 0 && addedPhoto.map((link) => {
          return (
            <div className="h-32 flex relative" key={link}>
              <img className="w-full object-cover rounded-2xl" src={'http://localhost:8080/uploads/' + link} alt={link} />
              <div className="">
              <button onClick={event => {removePhoto(event, link)}}>
                <TrashIcon className="w-8 h-8 absolute bottom-1 right-1 text-white bg-black py-1 px-2 bg-opacity-50 rounded-xl" />
              </button>
              <button onClick={event => {selectAsMainPhoto(event, link)}}>
                {
                  link === addedPhoto[0] ? (
                    <StarIcon className="w-8 h-8 absolute fill-yellow-500 text-yellow-500 bottom-1 left-1 bg-black py-1 px-2 bg-opacity-50 rounded-xl" />
                  ) : (
                    <StarIcon className="w-8 h-8 absolute bottom-1 left-1 text-white bg-black py-1 px-2 bg-opacity-50 rounded-xl" />
                  )
                }
                </button>
              </div>
            </div>
          )
        })}
        <label className="h-32 cursor-pointer flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
          <CloudArrowUpIcon className="w-8 h-8"/>
          Upload
        </label>
      </div>
    </>
  )
}

export default PhotoUploader