const PlaceImg = ({place, className = null}) => {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover aspect-square'
  }
  return (
    <img className={className} src={'http://localhost:8080/uploads/' + place.photos[0]} alt=""/>
  )
}

export default PlaceImg