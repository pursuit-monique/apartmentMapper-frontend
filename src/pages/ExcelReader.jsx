import React from 'react';
import { read, utils } from 'xlsx';
import axios from 'axios';

function ExcelReader() {
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
  
        // Process each row with a delay
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
  
          await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second delay
  
          const current = {
            "contractor": row[0],
            "staddress": row[1],
            "apartment": row[2],
            "floor": row[3],
            "city": row[4],
            "borough": row[5],
            "zip": row[6],
            "num_bedrooms": row[7],
            "vacant": row[8],
            "accessable": row[9],
            "gender": row[10],
            "unavail_date": row[11],
            "isVacant": row[12],
            "isOffline": row[13],
            "offlineInfo": row[14],
            "aptTreatment": row[15],
            "notes": row[16]
          };
          const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${current.staddress} ${current.borough} ${current.zip} US&key=${process.env.REACT_APP_GOOGLEMAP_API_KEY}`;
  
          try {
            const response = await fetch(geocodeURL);
            const geocodeData = await response.json();
  
            const { lat, lng } = geocodeData.results[0].geometry.location;
  
            current.lat = lat;
            current.lng = lng;
  
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/apartments`, current)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };
  
      reader.readAsArrayBuffer(file);
    };
    // const address = '89%20217%20Street%20Queens%20Village%20NY%2011427%20US';
    // const apiKey = 'AIzaSyCEsZdLJGtK_DSnlWqIAtMmimlWbQmupoQ';
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Log the response to the console
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log('An error occurred:', error);
    //   });


  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default ExcelReader;
