import Controls from "./Control";
import './NavBar.css'; 

export default function NavBar({setApartmentList, apartmentList, selectedValue, setSelectedValue, selection}) {
  return (
    <div className="navbar navbar-expand-lg navbar-transparent border border-bottom">
      <Controls setApartmentList={setApartmentList} apartmentList={apartmentList} selectedValue={selectedValue} setSelectedValue={setSelectedValue} selection={selection} />
    </div>
    )
}