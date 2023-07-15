import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useRef, useEffect } from "react";
import { Offcanvas, Toast, Tooltip } from 'bootstrap'


export default function Map({apartmentList, selection}) {


    const [currApartment, setCurrApartment] = useState('');
    const [bounceToggle, setBounceToggle] = useState({on: false, id: null});
    const currList = useRef(apartmentList);

    
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));

    console.log(tooltipList);



 useEffect(() =>{
    currList.current = apartmentList;
 }, [apartmentList]);

        const toastRef = useRef(null);
      
        const triggerCustomToast = () => {
          const toastElement = toastRef.current;
          if (toastElement) {
            const toast = new Toast(toastElement, {
              delay: 5000, 
            });
            toast.show();
      
            setTimeout(() => {
              toast.hide();
            }, 10000); 
          }
        };
      
        useEffect(() => {
          const toastElement = toastRef.current;
          if (toastElement) {
            const toast = new Toast(toastElement);
            toast.show();
      
            setTimeout(() => {
              toast.hide();
            }, 10000); 
          }
        }, []); 
    

    // console.log("map", apartmentList);
  

    const openOffcanvas = () => {

        var offcanvas = new Offcanvas(offcanvasRef.current, {
          backdrop: true, 
        })
        offcanvas.show();
      };

      const openOffcanvasbottom = () => {

        var offcanvas = new Offcanvas(offcanvasRefTwo.current, {
          backdrop: true, 
        })
        offcanvas.show();
      };


const offcanvasRef = useRef();
const offcanvasRefTwo = useRef();

    const mapRef = useRef(null);


    function handleApartmentSelection(info){
        // console.log(info)
        setCurrApartment(info);
    }
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY,
      });


      const center = useMemo(() => ({ lat:  40.712784, lng: -74.005941 }), []);
      return (
        <div className="map position-relative">
            
        {!isLoaded ? (

          <div className="position-absolute top-50 start-50 translate-middle"> 
            <div className="spinner-grow text-info" style={{ width: '30rem', height: '30rem'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        ) : (
          <GoogleMap
          ref={mapRef}
            mapContainerClassName="map-container"
            center={center}
            zoom={11}
            options={{mapId: '1bbc82a69df772e2'}}
            onLoad={() => triggerCustomToast}
          >
            {/* <Marker position={{address: '22518 mentone ave. laurelton NY 11413'}} /> */}
            {/* <MarkerClusterer options={options}> */}
            {Array.isArray(apartmentList) ? apartmentList.map(marker=>{ return(<Marker
              id={"portrait"}
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={`${marker.contractor}: ${marker.borough}`}
              icon={{  url: `${marker.isvacant === 'Vacant' ? 'https://maps.google.com/mapfiles/ms/icons/blue.png' : 'https://maps.google.com/mapfiles/ms/icons/red.png'}`, // Replace 'blue' with your desired color
              scaledSize: new window.google.maps.Size(30, 30), // Adjust the size if needed
              anchor: { x: 15, y: 30 } // Adjust the anchor point if needed
              }}
              animation={marker.id === bounceToggle.id ? window.google.maps.Animation.BOUNCE : null}
              className={"person-marker-icon"}
              onClick={()=>{
                setBounceToggle({on: !bounceToggle.on, id: marker.id});
                 openOffcanvas('one');
                 handleApartmentSelection({...marker})}
              }
            //   setShape= {}
 
              />)}): null }
              {/* </MarkerClusterer> */}
          </GoogleMap>
        )}
          <div ref={offcanvasRef} className="offcanvas offcanvas-start w-45" tabIndex="-1" id="myOffcanvas">
        <div className={`offcanvas-header ${currApartment.isvacant === "Vacant" ? "bg-info bg-gradient" : "bg-danger bg-gradient"
}`}>
          <h5 className="offcanvas-title text-white">{currApartment.contractor} <span className="text-end"> ID: #{currApartment.id}</span></h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
        <div className="container-fluid h-50 w-100 p-0 m-0">
      <div className="row h-100">
        <div className="col">
          <iframe
          allowFullScreen="" 
                              loading="lazy" 
                              referrerPolicy="no-referrer-when-downgrade" 
            src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.REACT_APP_GOOGLEMAP_API_KEY}&location=${currApartment.lat},${currApartment.lng}&heading=210&pitch=10&fov=35`}
            className="w-100 h-100"
            title="Embedded Content"
          ></iframe>
        </div>
      </div>
    </div>
<p className="text-end text-secondary px-1 mx-1 fw-light fst-italic">
{currApartment.isvacant === "Vacant" ? 'This location has vacancies' : "This location is unavailable"}

</p>




<p className="m-2 p-2">
 {/* Building */}
 <svg xmlns="http://www.w3.org/2000/svg" style={{height:'20px', width: '20px'}} data-name="Layer 1" viewBox="0 0 24 24" id="building"><path fill="#0d6efd" d="M14,8h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2Zm0,4h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2ZM9,8h1a1,1,0,0,0,0-2H9A1,1,0,0,0,9,8Zm0,4h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,8H20V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-8,0H11V16h2Zm5,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v5H6V4H18Z"></path></svg>
    <strong>Address: </strong>{currApartment.staddress}.  #{currApartment.apartment}. {currApartment.city} NY, {currApartment.zip}
    </p>
    
    <p>
            {/* doctor */}
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" style={{height:'20px', width: '20px'}} data-name="Layer 1" viewBox="0 0 24 24" id="user-md"><path fill="#0d6efd" d="m15.899 13.229-.005-.002c-.063-.027-.124-.058-.188-.083A5.988 5.988 0 0 0 18 8.434a5.29 5.29 0 0 0-.045-.63.946.946 0 0 0 .038-.122l.281-2.397a3.006 3.006 0 0 0-2.442-3.302l-.79-.143a16.931 16.931 0 0 0-6.083 0l-.791.143a3.006 3.006 0 0 0-2.442 3.302l.28 2.397a.946.946 0 0 0 .039.122 5.29 5.29 0 0 0-.045.63 5.988 5.988 0 0 0 2.294 4.71c-.064.025-.125.056-.188.083l-.005.002a9.948 9.948 0 0 0-6.035 8.097 1 1 0 0 0 1.988.217 7.948 7.948 0 0 1 4.216-6.185l3.023 3.023a1 1 0 0 0 1.414 0l3.023-3.023a7.948 7.948 0 0 1 4.216 6.185 1 1 0 0 0 .992.892 1.048 1.048 0 0 0 .11-.006 1 1 0 0 0 .886-1.103 9.948 9.948 0 0 0-6.036-8.097ZM7.712 5.051a1.002 1.002 0 0 1 .814-1.1l.79-.143a14.93 14.93 0 0 1 5.368 0l.79.143a1.002 1.002 0 0 1 .814 1.1l-.178 1.514H7.89ZM12 16.261l-1.65-1.651a7.85 7.85 0 0 1 3.3 0Zm0-3.826a4.005 4.005 0 0 1-3.998-3.87h7.996A4.005 4.005 0 0 1 12 12.435Z"></path></svg>
          <strong className="pl-2">Apartment Treatment:</strong> {currApartment.apttreatment}

          </p>
          {/* {currApartment.isvacant}

          {currApartment.vacant} */}

          <p>
          {/* Assessible */}
          <svg xmlns="http://www.w3.org/2000/svg" style={{height:'20px', width: '20px'}} data-name="Layer 1" viewBox="0 0 24 24" id="accessible-icon-alt"><path fill="#0d6efd" d="M16,7a2,2,0,1,0-2-2A2,2,0,0,0,16,7ZM12.7,18.4A4,4,0,1,1,9.05,12a1,1,0,1,0-.22-2A6,6,0,0,0,9.5,22a6,6,0,0,0,4.8-2.4,1,1,0,0,0-1.6-1.2ZM19.5,20h-1V15a1,1,0,0,0-1-1H12.93l1.69-4.66s0-.07,0-.11l0-.2a1.1,1.1,0,0,0,0-.18,1.06,1.06,0,0,0,0-.19,1.4,1.4,0,0,0-.09-.17.72.72,0,0,0-.11-.15.64.64,0,0,0-.15-.13s0-.06-.08-.08L9.71,5.55l-.12,0a1.06,1.06,0,0,0-.19-.06H9a.8.8,0,0,0-.2.07l-.11,0L6,7.13A1,1,0,0,0,6.48,9,1,1,0,0,0,7,8.87l2.23-1.3,3.24,1.88-1.89,5.21a.88.88,0,0,0,0,.16.58.58,0,0,0,0,.18,0,0,0,0,0,0,0,3,3,0,0,0,.08.38l.11.15a.57.57,0,0,0,.11.16.67.67,0,0,0,.14.09,1.22,1.22,0,0,0,.19.12h0a1,1,0,0,0,.34.06h5v5a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2Z"></path></svg>
         <strong>Wheelchair accessable:</strong> {currApartment.accessable}
         </p>


         
         
         <p>
          {/* beds */}
          <svg xmlns="http://www.w3.org/2000/svg" style={{height:'20px', width: '20px'}} viewBox="0 0 24 24" id="bed"><path fill="#0d6efd" d="M7,12.5a3,3,0,1,0-3-3A3,3,0,0,0,7,12.5Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,7,8.5Zm13-2H12a1,1,0,0,0-1,1v6H3v-8a1,1,0,0,0-2,0v13a1,1,0,0,0,2,0v-3H21v3a1,1,0,0,0,2,0v-9A3,3,0,0,0,20,6.5Zm1,7H13v-5h7a1,1,0,0,1,1,1Z"></path></svg>
          <strong>Bedrooms available: </strong> {currApartment.num_bedrooms}
       </p>

       <p>
       {/* notes */}
       <svg xmlns="http://www.w3.org/2000/svg" style={{height:'20px', width: '20px'}}  viewBox="0 0 24 24" id="comment-alt-notes"><path fill="#0d6efd" d="M7,7A1,1,0,1,0,8,8,1,1,0,0,0,7,7Zm0,4a1,1,0,1,0,1,1A1,1,0,0,0,7,11Zm10,0H11a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm0-4H11a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm2-5H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"></path></svg>
       <strong>Notes: </strong> {currApartment.notes || "None"}
       </p>


       {/* Offline info */}
<p><svg xmlns="http://www.w3.org/2000/svg" style={{height:'20px', width: '20px'}} viewBox="0 0 24 24" id="n-a"><path fill="#0d6efd" d="M19,6H18a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V13h3v4a1,1,0,0,0,2,0V9A3,3,0,0,0,19,6Zm1,5H17V9a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1ZM8,6A1,1,0,0,0,7,7v5.76L3.89,6.55A1,1,0,0,0,2,7V17a1,1,0,0,0,2,0V11.24l3.11,6.21A1,1,0,0,0,8,18a.91.91,0,0,0,.23,0A1,1,0,0,0,9,17V7A1,1,0,0,0,8,6Zm4-2a1,1,0,0,0-1,1V19a1,1,0,0,0,2,0V5A1,1,0,0,0,12,4Z"></path></svg>
 <strong> Offline Info:</strong> {currApartment.offlineinfo} </p>
 <div class="d-grid gap-2">
  <button class={`btn text-white ${currApartment.isvacant === "Vacant" ? "btn-info bg-gradient" : "btn-danger bg-gradient"
}`} type="button" style={{borderRadius: '0px'}}>More Info</button>
</div>
        </div>



    </div>

    <div ref={offcanvasRefTwo} className="offcanvas offcanvas-bottom h-50" tabIndex="-1" id="myOffcanvasTwo">
        <div className={`offcanvas-header bg-secondary`}>
          <h5 className="offcanvas-title text-white">Current Data: {apartmentList?.length || '0'}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-1">
        <table class="table table-striped table-hover">
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Contractor</th>
      <th scope="col">Borough</th>
      <th scope="col">Online</th>
      <th scope="col">Address</th>
      <th scope="col">Floor</th>
      <th scope="col">Apartment</th>
      <th scope="col">City</th>
      <th scope="col">ZIP</th>
      <th scope="col"># of Bedrooms</th>
      <th scope="col">Vacant</th>
      <th scope="col"># Vacant</th>
      <th scope="col">Gender</th>
      <th scope="col">Apartment Treatment</th>
      <th scope="col">Accessable</th>
      <th scope="col">Offline</th>
      <th scope="col">Notes</th>

    </tr>
  </thead>
  <tbody>
  {apartmentList?.map(tableRow => {
    return (
        <tr>
        {/* <th scope="row"></th> */}
        <th scope="row">{tableRow.id}</th>
        <td>{tableRow.contractor}</td>
        <td>{tableRow.borough}</td>
        <td>{tableRow.isoffline}</td>
        <td>{tableRow.staddress}</td>
        <td>{tableRow.floor}</td>
        <td>{tableRow.apartment}</td>
        <td>{tableRow.city}</td>
        <td>{tableRow.zip}</td>
        <td>{tableRow.num_bedrooms}</td>
        <td>{tableRow.isvacant}</td>
        <td>{tableRow.vacant}</td>
        <td>{tableRow.gender}</td>
        <td>{tableRow.apttreatment}</td>
        <td>{tableRow.accessable}</td>
        <td>{tableRow.offlineinfo}</td>
        <td>{tableRow.notes}</td>
      </tr>
    )
  })}
  </tbody>
</table>

        </div>



    </div>

    <div id="customToastContainer" className="position-absolute bottom-0 start-50 translate-middle-x" aria-live="polite" aria-atomic="true" style={{minHeight: '200px' }}>
      <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
        <div className="toast-header">
          <strong className="me-auto">Map loaded</strong>
          <small className="text-muted">Just now</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          The map has loaded with default values.
        </div>
      </div>
      </div>



    <div class="position-absolute top-0 start-50 translate-middle-x bg-light shadow-lg rounded border align-middle card" style={{height: '9vh', width: '30vw', marginTop: '10%'}}> 
    <div className="p-1 transparent-frame border shadow-lg ">
        <div className="border border-dark-subtle">
    <div class="card-header">
    <button type="button" className="btn btn-link text-decoration-none text-secondary p-0 m-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Click to see Data." onClick={openOffcanvasbottom}><strong>Total:</strong> {apartmentList?.length !== 0 ?<span className="text-info"> {apartmentList?.length}</span> : <span className="text-danger">0</span>}</button>
  </div>
  <div className="card-body bg-light">
  <div className="m-2">
    {selection.current.contractor ? <span class="badge bg-secondary mx-1"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" style={{width: '20px', height: '20px'}} id="constructor"><path fill="#FFFFFF" d="M20,9.67V9.5a7.95,7.95,0,0,0-5.59-7.62l-.06,0a8.32,8.32,0,0,0-2.59-.36A8.21,8.21,0,0,0,4,9.67a3,3,0,0,0,0,5.66,8,8,0,0,0,8,7.17h.23a8.13,8.13,0,0,0,7.68-7.16A3,3,0,0,0,20,9.67ZM12.18,20.5a6,6,0,0,1-6.09-5H17.86A6.09,6.09,0,0,1,12.18,20.5Zm6.82-7H5a1,1,0,0,1,0-2H7a1,1,0,0,0,0-2H6A6.4,6.4,0,0,1,9,4.35V7.5a1,1,0,0,0,2,0V3.59a7.34,7.34,0,0,1,.82-.09H12a6.64,6.64,0,0,1,1,.09V7.5a1,1,0,0,0,2,0V4.32a6.65,6.65,0,0,1,1.18.87A6,6,0,0,1,18,9.5H17a1,1,0,0,0,0,2h2a1,1,0,0,1,0,2Z"></path></svg>{selection.current.contractor.split('_').join(' ')} </span> : null }  
    {selection.current.borough ? <span class="badge bg-secondary mx-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{width: '20px', height: '20px'}} id="globe"><path fill="#FFFFFF" d="M21.41,8.64s0,0,0-.05a10,10,0,0,0-18.78,0s0,0,0,.05a9.86,9.86,0,0,0,0,6.72s0,0,0,.05a10,10,0,0,0,18.78,0s0,0,0-.05a9.86,9.86,0,0,0,0-6.72ZM4.26,14a7.82,7.82,0,0,1,0-4H6.12a16.73,16.73,0,0,0,0,4Zm.82,2h1.4a12.15,12.15,0,0,0,1,2.57A8,8,0,0,1,5.08,16Zm1.4-8H5.08A8,8,0,0,1,7.45,5.43,12.15,12.15,0,0,0,6.48,8ZM11,19.7A6.34,6.34,0,0,1,8.57,16H11ZM11,14H8.14a14.36,14.36,0,0,1,0-4H11Zm0-6H8.57A6.34,6.34,0,0,1,11,4.3Zm7.92,0h-1.4a12.15,12.15,0,0,0-1-2.57A8,8,0,0,1,18.92,8ZM13,4.3A6.34,6.34,0,0,1,15.43,8H13Zm0,15.4V16h2.43A6.34,6.34,0,0,1,13,19.7ZM15.86,14H13V10h2.86a14.36,14.36,0,0,1,0,4Zm.69,4.57a12.15,12.15,0,0,0,1-2.57h1.4A8,8,0,0,1,16.55,18.57ZM19.74,14H17.88A16.16,16.16,0,0,0,18,12a16.28,16.28,0,0,0-.12-2h1.86a7.82,7.82,0,0,1,0,4Z"></path></svg>{selection.current.borough} </span> : null }   
    {selection.current.accessable !== '' ? <span class="badge bg-secondary mx-1"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" style={{width: '20px', height: '20px'}} viewBox="0 0 24 24" id="wheelchair"><path fill="#FFFFFF" d="M12,6.5a2,2,0,1,0-2-2A2,2,0,0,0,12,6.5Zm7.5,14h-1v-5a1,1,0,0,0-1-1h-5v-2h5a1,1,0,0,0,0-2h-5v-2a1,1,0,0,0-2,0v7a1,1,0,0,0,1,1h5v5a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2Zm-6.8-1.6a4,4,0,0,1-7.2-2.4,4,4,0,0,1,2.4-3.66A1,1,0,1,0,7.1,11a6,6,0,1,0,7.2,9.1,1,1,0,0,0-1.6-1.2Z"></path></svg>{selection.current.accessable ? 'Yes' : 'No'} </span> : null }    
    {selection.current.vacant !== ''  ? <span class="badge bg-secondary mx-1"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" style={{width: '20px', height: '20px'}} id="building"><path fill="#FFFFFF" d="M14,8h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2Zm0,4h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2ZM9,8h1a1,1,0,0,0,0-2H9A1,1,0,0,0,9,8Zm0,4h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,8H20V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-8,0H11V16h2Zm5,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v5H6V4H18Z"></path></svg>{selection.current.vacant ? 'Yes' : 'No'} </span> : null }    
    </div>
    </div>
    </div>
    </div>
      </div>
      </div>

      );
    };


