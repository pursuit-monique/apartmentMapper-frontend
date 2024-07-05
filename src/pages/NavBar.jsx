import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Controls from "./Control";
import './NavBar.css'; 

export default function NavBar({setApartmentList, apartmentList, selectedValue, setSelectedValue, selection}) {
  const location = useLocation();
  const [ navbar, setNavbar ] = useState(<></>);
  console.log(location);


  useEffect( () => {
    if ( location.pathname === "/" ){
      setNavbar(<div className="navbar navbar-expand-lg navbar-transparent border border-bottom">
      <Controls setApartmentList={setApartmentList} apartmentList={apartmentList} selectedValue={selectedValue} setSelectedValue={setSelectedValue} selection={selection} />
    </div>);
      console.log("Pathname = not home")

    } 
  }, [ location.pathname ] 
);

  return (
      <>
        { navbar }
      </>
    )
}