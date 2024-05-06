import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RoutingMachine = (map) => {
    L.Routing.control({
        waypoints: [
            L.latLng(27.7172, 85.324), // Example origin coordinates
            L.latLng(27.669838, 84.438912)   // Example destination coordinates
        ],
        routeWhileDragging: false,
        draggableWaypoints: false, // Disable dragging of waypoints
        addWaypoints: false, // Disable adding new waypoints
        removeWaypoints: false,
    }).addTo(map);
};

export default RoutingMachine;
