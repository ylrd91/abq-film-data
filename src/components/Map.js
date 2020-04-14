import React, { useState, useEffect } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

import Location from './Location';

function Map({ locations }) {
  const [center, setCenter] = useState({ lat: 39.5, lng: -98.35 });
  const [zoom, setZoom] = useState(5);
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (locations) {
      setCenter(locations[0].geometry);
      setZoom(12);
    }
  }, [locations]);

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={API_KEY}
    >
      <GoogleMap
        id="example-map"
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        zoom={zoom}
        center={center}
      >
        {locations && locations.map((location) => (
          <Location
            key={location.id}
            location={location}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
