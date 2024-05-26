import { user } from "@nextui-org/react";
import conf from "./conf";
import {Client,ID,Databases,Query} from 'appwrite';

export class Service{
  client=new Client();
  databases;

  constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }
  async addLocation({userId,lattitude,longitude}){
    try{
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.locationCollectionId,
        ID.unique(),
        {
         userId,
          lattitude,
          longitude,
        }
      )
    }catch(error){
      console.log("error on addLocation",error);
    }
  }

  // async getUserLocation(userId,queries=[Query.equal("userId",userId)]){
  //   try {
  //     return await this.databases.listDocuments(
  //         conf.appwriteDatabaseId,
  //         conf.appwriteCollectionId,
  //         queries,
          

  //     )
  // } catch (error) {
  //     console.log("Appwrite serive :: getUserLocation :: error", error);
  //     return false
  // }
  // }

  async storeUserLocation({userId, latitude, longitude}) {
    try {
      // Check if the user document already exists
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId, 
        conf.locationCollectionId, 
        [
        Query.equal('userId', userId),
      ]);
  
      if (response.total > 0) {
        // Update the existing document
        const documentId = response.documents[0].$id;
      return await this.databases.updateDocument(
          conf.appwriteDatabaseId, 
          conf.locationCollectionId, 
          documentId,
          {
          latitude,
          longitude,
        });
       
      } else {
        // Create a new document
       return await this.databases.createDocument(conf.appwriteDatabaseId, 
          conf.locationCollectionId, 
          ID.unique(),
          {
          userId,
        
          longitude,
          latitude,
        });
      }
    } catch (error) {
      console.error('Error storing user location:', error);
    }
  };
  async fetchUserLocation(){
    try{
     return await this.databases.listDocuments(conf.appwriteDatabaseId,
       conf.locationCollectionId,
      );
    }catch(error){
      console.log(error);
    }
  
  }

  async fetchUser(userId){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.userInfoCollectionId,
        [
          Query.equal('userId', userId),
        ]
      )

    }catch(error){
      console.log("error in fetchUser function in config.js",error);
    }
  }




  async addRoute({from,to}){
    try{
  return  await this.databases.createDocument(conf.appwriteDatabaseId, 
      conf.routeCollectionId, 
      ID.unique(),
      {
     
      from,
      to
   
    });
    }catch(error){
      throw error;
    }
  }
  async addBus({busNo,ownerName,route}){
    try{
  return  await this.databases.createDocument(conf.appwriteDatabaseId, 
      conf.busCollectionId, 
      ID.unique(),
      {
     busNo,
     ownerName,
     route
   
    });
    }catch(error){
      throw error;
    }
  }
  async searchBus({busNo}){
    try{
  return  await this.databases.listDocuments(conf.appwriteDatabaseId, 
      conf.busCollectionId, 
      [
        Query.equal('busNo', busNo),
      ] 
    );
    
    }catch(error){
      throw error;
    }
  }



}
const service=new Service()
export default service