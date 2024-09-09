import { useMap } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

function CurrentLocationButton() {
  const map = useMap();
  const [marker, setMarker] = useState(null);

  const handleLocateClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const latlng = L.latLng(latitude, longitude);

          // Smooth zoom effect
          const zoomTo = (latlng, zoomLevel) => {
            const currentZoom = map.getZoom();
            const zoomDiff = zoomLevel - currentZoom;

            const start = performance.now();

            const animateZoom = (timestamp) => {
              const progress = (timestamp - start) / 500; // Duration in seconds
              const t = Math.min(progress / 1, 1); // 1 second for the animation

              map.setView(
                latlng,
                currentZoom + zoomDiff * t,
                { animate: false } // Disable default animation
              );

              if (t < 1) {
                requestAnimationFrame(animateZoom);
              } else {
                map.setView(latlng, zoomLevel); // Final view
              }
            };

            requestAnimationFrame(animateZoom);
          };

          zoomTo(latlng, 16); // Adjust the target zoom level if needed

          // Update or add marker
          if (marker) {
            marker.setLatLng(latlng);
          } else {
            const newMarker = L.marker(latlng, {
              icon: L.icon({
                iconUrl: 'navigator.svg', // Path to your custom icon
                iconSize: [25, 25],
                iconAnchor: [12, 25],
              }),
            }).addTo(map);

           
            newMarker.bindPopup('<b>You are here!</b>').openPopup(); // Add and open popup
            setMarker(newMarker);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <button
      onClick={handleLocateClick}
      className="absolute bottom-4 right-4 z-[1600] bg-white border-2 border-gray-400 rounded-full p-2 shadow-lg"
    >
      <img
        src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3204568/locate-icon-md.png" // Path to your image
        alt="Locate Icon"
        className="w-8 h-8" // Adjust size as needed
      />
    </button>
  );
}

export default CurrentLocationButton;
