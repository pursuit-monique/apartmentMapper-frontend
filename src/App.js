import ExcelReader from "./pages/ExcelReader";
// import Controls from "./pages/Controls";
import Map from "./pages/Map";
import NavBar from "./pages/NavBar";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  // const [selectedValue, setSelectedValue] = useState("nothing");
  const [apartmentList, setApartmentList] = useState();
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const selection = useRef({
    contractor: "",
    floor: "",
    borough: "",
    accessable: "",
    vacant: "",
  });

  // const [query, setQuery] = useState(selection.current);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3331/apartments/`)
  //     .then((response) => {
  // setApartmentList(response.data);
  // setIsLoaded(true);
  //     })

  //     .catch((c) => {
  //       console.warn("catch", c);
  //       setIsLoaded(false);
  //     });
  // }, [selectedValue]);
  useEffect(() => {
    axios
      .get("http://localhost:3331/apartments/")
      .then((response) => {
        // Handle the response data
        setApartmentList(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        {isLoaded ? (
          <NavBar
            setApartmentList={setApartmentList}
            apartmentList={apartmentList}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            selection={selection}
          />
        ) : null}
        <Routes>
          <Route path="/update" element={<ExcelReader />} />
          {/* <Controls
        apartmentList={apartmentList}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      /> */}
          {/* <div className="map"> */}
          <Route
            path="/"
            element={
              <Map
                // selectedValue={selectedValue}
                apartmentList={apartmentList}
                selection={selection}
              />
            }
          />
          {/* </div> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
