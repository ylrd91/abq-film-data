import React, { useState, useEffect } from 'react';

import {
  Marker, InfoWindow,
} from '@react-google-maps/api';

import events from '../events';

function Location({ location }) {
  const [isVisible, setVisibility] = useState(false);

  const {
    id, address, site, shootDate, geometry,
  } = location;

  useEffect(() => {
    // Upon clicking on a marker, if another marker's InfoWindow is open, close it.
    const cbId = events.on('marker.clicked', (locationId) => {
      if (locationId !== id) {
        setVisibility(false);
      }
    });
    return () => { events.unsubscribe('marker.clicked', cbId); };
  }, [id]);

  const openInfoWindow = () => {
    setVisibility(true);
    events.broadcast('marker.clicked', id);
  };

  return (
    <Marker
      position={geometry}
      onClick={openInfoWindow}
    >
      {isVisible && (
        <InfoWindow position={geometry} onCloseClick={() => { setVisibility(false); }}>
          <div className="flex flex-col">
            <span className="mb-2 font-bold">{address}</span>
            <span className="mb-2">{site}</span>
            <span>{shootDate}</span>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

export default Location;
