const conf={
  appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
   locationCollectionId:String(import.meta.env.VITE_APPWRITE_Location_COLLECTION_ID),
   busCollectionId:String(import.meta.env.VITE_APPWRITE_Bus_COLLECTION_ID),
   routeCollectionId:String(import.meta.env.VITE_APPWRITE_Route_COLLECTION_ID),
   userInfoCollectionId:String(import.meta.env.VITE_APPWRITE_UserInfo_COLLECTION_ID),
   DrivernfoCollectionId:String(import.meta.env.VITE_APPWRITE_DriverInfo_COLLECTION_ID),
  // appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf