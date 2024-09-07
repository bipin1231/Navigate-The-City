import service from '../../../../appwrite/config';

export const fetchUserLocation = async (setUsers) => {
  const data = await service.fetchUserLocation();
  const userLocations = data.documents.map(doc => ({
    userId: doc.userId,
    position: [doc.latitude, doc.longitude],
    heading: doc.heading,
    speed: doc.Speed,
    name: doc.name,
  }));
  setUsers(userLocations.filter(user => user.position[0] !== null));
};
