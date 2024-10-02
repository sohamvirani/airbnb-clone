import { MapPinIcon } from "@heroicons/react/24/outline";

const AddressLink = ({place}) => {
  return (
    <a className="flex gap-1 my-3 font-semibold underline hover:underline-offset-2" target="_blank" href={'https://maps.google.com//?q=' + place.address} rel="noreferrer">
      <MapPinIcon className="w-6 h-6"/>
      {place.address}
    </a>
  )
}

export default AddressLink