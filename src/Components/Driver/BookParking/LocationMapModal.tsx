import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxClient from '@mapbox/mapbox-sdk';
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions';

interface LocationMapModalProps {
  open: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
  currentLatitude: number;
  currentLongitude: number;
}

const LocationMapModal: React.FC<LocationMapModalProps> = ({
  open,
  onClose,
  latitude,
  longitude,
  currentLatitude,
  currentLongitude
}) => {
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 14,
    width: '100%',
    height: '400px'
  });

  const [route, setRoute] = useState<any>(null);

  useEffect(() => {
    if (open) {
      setViewport((prev) => ({
        ...prev,
        latitude: (latitude + currentLatitude) / 2, // Center the map between start and end
        longitude: (longitude + currentLongitude) / 2,
      }));

      const directionsClient = mapboxDirections(mapboxClient({ accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN! }));
      directionsClient.getDirections({
        profile: 'driving',
        waypoints: [
          { coordinates: [currentLongitude, currentLatitude] }, // Start point
          { coordinates: [longitude, latitude] } // End point
        ]
      })
      .send()
      .then((response) => {
          
          const data = response.body;
        if (data.routes.length > 0) {
          const routeGeoJson = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: data.routes[0].geometry // Ensure this is an array of coordinates
            },
            properties: {}
          };
          setRoute({
            type: 'FeatureCollection',
            features: [routeGeoJson]
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching directions:', error);
      });
    }
  }, [open, latitude, longitude, currentLatitude, currentLongitude]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 700, height: 500, margin: 'auto', marginTop: '10%' }}>
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMove={(evt) => setViewport({ ...viewport, ...evt.viewState })}
          onMoveEnd={() => {}}
        >
          <Marker latitude={latitude} longitude={longitude}>
            <div>📍</div>
          </Marker>
          <Marker latitude={currentLatitude} longitude={currentLongitude}>
            <div>📍</div>
          </Marker>
          {route && (
            <Source id="route" type="geojson" data={route}>
              <Layer
                id="route"
                type="line"
                source="route"
                layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                paint={{ 'line-color': '#888', 'line-width': 8 }}
              />
            </Source>
          )}
        </ReactMapGL>
      </Box>
    </Modal>
  );
};

export default LocationMapModal;
