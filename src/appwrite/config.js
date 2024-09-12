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

  async storeUserLocation({userId,name, latitude, longitude,BusNo,Speed,userType,status,heading,busNo}) {
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
            name,
          latitude,
          longitude,
          status,
          Speed,
          heading,
          BusNo:busNo,
        });
       
      } else {
        // Create a new document

       return await this.databases.createDocument(conf.appwriteDatabaseId, 
          conf.locationCollectionId, 
          ID.unique(),
          {
          userId,
        name,
          longitude,
          latitude,
          BusNo,
          Speed,
          userType,
          status,
          heading
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
       [
       Query.equal('status',true ),
       ]
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
  async fetchDriverInfo(userId){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.DrivernfoCollectionId,
        [
          Query.equal('userId', userId),
        ]
      )

    }catch(error){
      console.log("error in fetchUser function in config.js",error);
    }
  }

  async fetchBus(){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.busCollectionId,
      )

    }catch(error){
      console.log("error in fetchUser function in config.js",error);
    }
  }
  async fetchRoute(){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.routeCollectionId,
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
  async addBus({busNo,ownerName,route,driver}){
    try{
  return  await this.databases.createDocument(conf.appwriteDatabaseId, 
      conf.busCollectionId, 
      ID.unique(),
      {
     busNo,
     ownerName,
     route,
     driver
   
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
  async addTicketInfo({name,seatNo,busNo,date,contact}){
    try{
  return  await this.databases.createDocument(conf.appwriteDatabaseId, 
      conf.TicketInfoCollectionId, 
      ID.unique(),
      {
        name,
        seatNo,
        busNo,
        date,
        contact
   
    });
    }catch(error){
      throw error;
    }
  }
  async showTicketInfo({name,seatNo,busNo,date,contact}){
    try{
  return  await this.databases.listDocuments(conf.appwriteDatabaseId, 
      conf.TicketInfoCollectionId, 
      ID.unique(),
      {
        name,
        seatNo,
        busNo,
        date,
        contact
   
    });
    }catch(error){
      throw error;
    }
  }


}
const service=new Service()
export default service