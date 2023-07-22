import Controls from "./Controls";
import './NavBar.css'; 

export default function NavBar({setApartmentList, apartmentList, selectedValue, setSelectedValue, selection}) {return (
// {/* <div className="navbar bg-base-100 bg-light bg-gradient bg-opacity-10 border border-bottom"> */}
<div className="navbar navbar-expand-lg navbar-transparent border border-bottom">
  
  <Controls setApartmentList={setApartmentList} apartmentList={apartmentList} selectedValue={selectedValue} setSelectedValue={setSelectedValue} selection={selection} />
</div>)
}