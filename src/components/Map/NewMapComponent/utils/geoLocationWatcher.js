export const geoLocationWatcher = (setPositionLoc, setHeading,setSpeed) => {
  const geoId = navigator.geolocation.watchPosition(
    position => {
      setPositionLoc([position.coords.latitude, position.coords.longitude]);
      setSpeed(position.coords.speed);
      setHeading(position.coords.heading);

     

    },
    error => console.error('Error retrieving location:', error),
    { enableHighAccuracy: true }
  );

//   const handleOrientation = (event) => {
//     const alpha = event.alpha;
//     if (alpha !== null) setHeading(alpha);
//   };

//   window.addEventListener('deviceorientation', handleOrientation);

//   return () => {

//     navigator.geolocation.clearWatch(geoId);
//     window.removeEventListener('deviceorientation', handleOrientation);
//   };
};
