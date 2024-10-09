import { useEffect, useState } from 'react'


import { Box, Typography } from '@mui/material'

function App() {
  const [shipData, setShipData] = useState(null)

useEffect(() => {
  fetch('https://meri.digitraffic.fi/api/ais/v1/locations')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setShipData(data);
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}, []);
  

  return (
    <Box sx={{height:"100vh", width:"100vw", backgroundColor:"#0F1214", color:"#F6F7F8", overflow:"auto"}}>
      <Box sx={{height:"20%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Typography>Cloud Computing - Curtis Thomas - Bundle J </Typography>
      </Box>

      <Box sx={{height:"80%", width:"100%"}}>
  
      {shipData === null ? (
  <Typography>Loading...</Typography>
) : (
  <Box >
       {Array.isArray(shipData.features) ? (
      shipData.features.slice(0, 100).map((ship, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F6F7F8",
            color: "#0F1214",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
            width: "80%",
            marginLeft: "10%",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
          }}
        >
          <Typography variant="h6">MMSI: {ship.properties.mmsi}</Typography>
          <Typography variant="h6">Latitude: {ship.geometry.coordinates[1]}</Typography>
          <Typography variant="h6">Longitude: {ship.geometry.coordinates[0]}</Typography>
        </Box>
      ))
    ) : (
      <Typography>Error loading data</Typography>
    )}
  </Box>
)}




    </Box>
    </Box>

 
  )
}

export default App
