import { icons } from "../common/PerkIcons";

const Perks = ({ selected, onChange }) => {
  const handleCheckboxClick = (event) => {
    const {checked, name} = event.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter(item => item !== name)])
    }
  }
  return (
    <>
      {
        icons.map((item, index) => {
          return (
            <label key={index} className="flex rounded-2xl gap-2  items-center border p-4 cursor-pointer">
              <input type="checkbox" checked={selected.includes(item.perk)} name={item.perk} onChange={handleCheckboxClick} />
              <item.icon className="w-6 h-6"/>
              <span>{item.name}</span>
            </label>
          )
        })
      }
    </>
  )
}

export default Perks