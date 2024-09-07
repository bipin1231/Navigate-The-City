import service from '../../../../appwrite/config';

export const storeUserLocation = (userData, positionLoc, heading,speed) => {
  // Check if the user is logged in and has valid location data
  if (!userData || !positionLoc) return;


  

  // Call the Appwrite database function to update the location data
  service.storeUserLocation({
    userId: userData.$id,
    name: userData.name,
    longitude: positionLoc.longitude,
    latitude: positionLoc.latitude,
    heading,
    Speed:speed,
  })
    .then(response => {
      console.log("User location stored successfully:", response);
    })
    .catch(error => {
      console.error("Error storing user location:", error);
    });
};
