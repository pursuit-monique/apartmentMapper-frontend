import ExcelReader from "./pages/ExcelReader";
import Map from "./pages/Map";
import NavBar from "./pages/NavBar";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const KEY = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [apartmentList, setApartmentList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const selection = useRef({
    contractor: "",
    floor: "",
    borough: "",
    accessable: "",
    vacant: "",
  });

  useEffect(() => {
    axios
      .get(`${KEY}/apartments/`)
      .then((response) => {
        setApartmentList(response.data);
        if (apartmentList.length > 1) {
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLoaded]);

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
          {!isLoaded ? (
            <Route path="/" element={<ExcelReader />} />
          ) : (
            <Route
              path="/"
              element={
                <Map apartmentList={apartmentList} selection={selection} />
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
