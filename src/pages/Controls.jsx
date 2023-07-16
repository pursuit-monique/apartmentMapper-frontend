import axios from "axios";
import { useState, useEffect } from "react";


function Controls({setApartmentList, selectedValue, selection}){
    // const [selection, setSelection] = useState('');
    const [contractorList, setContractorList] = useState('');
    const [ boroughList, setBoroughList] = useState('');
    const [query, setQuery] = useState(selection.current);

    const form = document.getElementById('control');

    useEffect(() => {
        axios
          .get(`http://localhost:3331/contractors/`)
          .then((response) => {
            // console.log(response.data)
            setContractorList(response.data);
            // setIsLoaded(true);
          })
    
          .catch((c) => {
            console.warn("catch", c);
            // setIsLoaded(false);
          });
      }, []);

      useEffect(() => {
        axios
          .get(`http://localhost:3331/contractors/boroughs/`)
          .then((response) => {
            // console.log(response.data)
            setBoroughList(response.data);
            // setIsLoaded(true);
          })
    
          .catch((c) => {
            console.warn("catch", c);
            // setIsLoaded(false);
          });
      }, []);
// useEffect(() => {
//     setQuery(selection.current);
// }, [selection.current.borough, selection.current.vacant, selection.current.floor, selection.current.contractor])

      function handleSubmit(event) {
        event.preventDefault();

        setQuery(selection.current);

        console.log("current selection", selection.current)
            if (Object.keys(selection.current).every((key) =>!selection.current[key] )) {
              axios
                .get(`http://localhost:3331/apartments/`)
                .then((response) => {
                  setApartmentList(response.data);
                //   setIsLoaded(true);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
            if (Object.keys(selection.current).some((key) => !!selection.current[key])) {
                // let vacant = '';
                // if(selection.current.vacant === false){
                //     vacant = false;
                //     console.log(vacant);
                // }
              let query = Object.keys(selection.current)
                .filter((key) => selection.current[key] || key === 'vacant')
                  .map((key) => `${key}=${selection.current[key]}`)
                  .join("&")
              ;
              console.log("query:", query);
              axios
                .get(`http://localhost:3331/apartments/query/?${query}`)
                .then((response) => {
                  // Handle the response data
                  setApartmentList(response.data);
                  console.log('query', `${process.env.REACT_APP_BACKEND_URL}apartments/query/?${query}`)
                //   setIsLoaded(true);
                })
                .catch((error) => {
                  // Handle the error
                  console.error(error);
                });
            }


      }
    console.log(query)
      function handleReset() {
        // Reset the form values
        selection.current = {
            contractor: '',
            floor: '',
            borough: '',
            accessable: '',
            vacant: ''
            };
            console.log(selection?.current)
            axios
      .get("http://localhost:3331/apartments/")
      .then((response) => {
        // Handle the response data
        setApartmentList(response.data);
        // setIsLoaded(true);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
        form.reset();
      }

    function onSelect(event){
console.log("ONSELECT TRIGGERED");
        const idvalue = event.target.id;
        // let defaultCheckmarkValue = value === 'on' ? "Yes";
        const grandparentNode = event.target.parentNode.parentNode;
        const grandparentId = grandparentNode.id;
        const value = event.target.checked &&  grandparentId !== 'floor' ? true :  event.target.value  === 'on' ? false : event.target.value ;
        console.log("grandparentID: ", grandparentId, "Event Value:", event.target.value);
        selection.current = {...selection.current, [idvalue || grandparentId]: value };
        console.log("selection current:", selection.current);
}

    if (Array.isArray(contractorList) && Array.isArray(boroughList)) {return(
<>
<div className="container d-flex justify-content-center align-items-center vh-15">
  <form id="control" className="row g-1 form-inline" onSubmit={handleSubmit}>
    <div className="col-6 mx-5" >


<div class="row py-3">
  <div class="col-auto p-0">
    <label htmlFor="contractor"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" style={{width: '20px', height: '20px'}} id="constructor"><path fill="#212529" d="M20,9.67V9.5a7.95,7.95,0,0,0-5.59-7.62l-.06,0a8.32,8.32,0,0,0-2.59-.36A8.21,8.21,0,0,0,4,9.67a3,3,0,0,0,0,5.66,8,8,0,0,0,8,7.17h.23a8.13,8.13,0,0,0,7.68-7.16A3,3,0,0,0,20,9.67ZM12.18,20.5a6,6,0,0,1-6.09-5H17.86A6.09,6.09,0,0,1,12.18,20.5Zm6.82-7H5a1,1,0,0,1,0-2H7a1,1,0,0,0,0-2H6A6.4,6.4,0,0,1,9,4.35V7.5a1,1,0,0,0,2,0V3.59a7.34,7.34,0,0,1,.82-.09H12a6.64,6.64,0,0,1,1,.09V7.5a1,1,0,0,0,2,0V4.32a6.65,6.65,0,0,1,1.18.87A6,6,0,0,1,18,9.5H17a1,1,0,0,0,0,2h2a1,1,0,0,1,0,2Z"></path></svg></label>
    </div>

    <div class="col">
      <select className="form-select form-select-sm border-0 border-bottom border-info bg-dark bg-opacity-75 text-white" aria-label=".form-select-lg example" id="contractor" value={selectedValue?.contractor} onChange={(event) => onSelect(event)}>
        <option value="">Contractor</option>
        {contractorList?.map(entry => <option value={entry.contractor.replaceAll(' ', '_')}>{entry.contractor} ({entry.count})</option>)}
      </select>

      </div>
      </div>
    </div>

    
    <div className="col-4">

    <div class="row py-3">
  <div class="col-auto p-0">
  <label htmlFor="borough"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{width: '20px', height: '20px'}} id="globe"><path fill="#212529" d="M21.41,8.64s0,0,0-.05a10,10,0,0,0-18.78,0s0,0,0,.05a9.86,9.86,0,0,0,0,6.72s0,0,0,.05a10,10,0,0,0,18.78,0s0,0,0-.05a9.86,9.86,0,0,0,0-6.72ZM4.26,14a7.82,7.82,0,0,1,0-4H6.12a16.73,16.73,0,0,0,0,4Zm.82,2h1.4a12.15,12.15,0,0,0,1,2.57A8,8,0,0,1,5.08,16Zm1.4-8H5.08A8,8,0,0,1,7.45,5.43,12.15,12.15,0,0,0,6.48,8ZM11,19.7A6.34,6.34,0,0,1,8.57,16H11ZM11,14H8.14a14.36,14.36,0,0,1,0-4H11Zm0-6H8.57A6.34,6.34,0,0,1,11,4.3Zm7.92,0h-1.4a12.15,12.15,0,0,0-1-2.57A8,8,0,0,1,18.92,8ZM13,4.3A6.34,6.34,0,0,1,15.43,8H13Zm0,15.4V16h2.43A6.34,6.34,0,0,1,13,19.7ZM15.86,14H13V10h2.86a14.36,14.36,0,0,1,0,4Zm.69,4.57a12.15,12.15,0,0,0,1-2.57h1.4A8,8,0,0,1,16.55,18.57ZM19.74,14H17.88A16.16,16.16,0,0,0,18,12a16.28,16.28,0,0,0-.12-2h1.86a7.82,7.82,0,0,1,0,4Z"></path></svg></label>
    </div>
    <div class="col">
      <select className="form-select form-select-sm border-0 border-bottom border-info bg-dark bg-opacity-75 text-white border-bottom-width" aria-label=".form-select-lg example" id="borough" value={selectedValue?.borough} onChange={(event) => onSelect(event)}>
        <option value=""><strong>Borough</strong></option>
        {boroughList?.map(entry => <option value={entry.borough.replaceAll(' ', '_')}>{entry.borough} ({entry.count})</option>)}
      </select>

      </div>
      </div>
    </div>
    <div className="col-12 d-flex justify-content-center">
    <div className="col-auto">
      {/* <div id="floor">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="1"
            onChange={(event) => onSelect(event)}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            1
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="2"
            onChange={(event) => onSelect(event)}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            2
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="3"
            onChange={(event) => onSelect(event)}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox3">
            3+
          </label>
        </div>
      </div> */}
    </div>

    <div className="col-auto mx-1">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" onClick={(event) => onSelect(event)} id="accessable" />
        <label className="form-check-label" htmlFor="accessable">Accessible</label>
      </div>
    </div>

    <div className="col-auto mx-1" style={{marginRight: '16px'}}>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" onClick={(event) => onSelect(event)} id="vacant" />
        <label className="form-check-label" htmlFor="vacant">Vacant</label>
      </div>
    </div>
{/* <div className="m-1"> */}
    <div className="col-auto mx-3"  >
      <button type="submit" className="btn btn-info text-white"><strong>Submit</strong></button>
    </div>
    <div className="col-auto">
      <button type="button" className="btn btn-danger" onClick={handleReset}><strong>Reset</strong></button>
    </div>
    {/* </div> */}
    </div>
    </form>
</div>
</>


    )} else{
        <></>
    }
}


// function genContractorList(list){
//     if (Array.isArray((list && list.length > 0))){
//         const currentList = new Set();
//         list?.forEach(entry =>  currentList.add(entry.contractor.trim()));
//         return [...currentList];
//     }
//     else {return ['nothing']}
// }

export default Controls;