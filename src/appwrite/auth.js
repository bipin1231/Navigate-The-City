import conf from "./conf";
import { Client, Account,ID,OAuthProvider,Databases } from 'appwrite';

export class AuthService{

  client=new Client()
  account;
  databases;
  constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

    this.account=new Account(this.client);
    this.databases = new Databases(this.client);
  }
  async createAccount({email,password,name,label='normal'}){
    try{
   const userAccount =  await this.account.create(ID.unique(),email,password,name,label)
   if(userAccount) {
    await this.databases.createDocument(conf.appwriteDatabaseId, 
      conf.userInfoCollectionId, 
      ID.unique(),
      {
      userId:userAccount.$id,
      type:"normal",
      name
   
    })
    return this.login({email,password})
   }
   else {return userAccount;}
    }catch(error){
      throw error;
    }
  }
  async createCompanyAccount({email,password,name,type='company'}){
    try{
   const userAccount =  await this.account.create(ID.unique(),email,password,name,type)
   if(userAccount) {
    await this.databases.createDocument(conf.appwriteDatabaseId, 
      conf.userInfoCollectionId, 
      ID.unique(),
      {
      userId:userAccount.$id,
      type:"company",
      name
   
    });

    return this.login({email,password})

   }
   else {return userAccount;}
    }catch(error){
      throw error;
    }
  }
  async createDriverAccount({email,password,name,busNo,type='driver'}){
    try{
   const userAccount =  await this.account.create(ID.unique(),email,password,name)
   if(userAccount) {
    await this.databases.createDocument(conf.appwriteDatabaseId, 
      conf.userInfoCollectionId, 
      ID.unique(),
      {
      userId:userAccount.$id,
      type:"driver",
    });
    await this.databases.createDocument(conf.appwriteDatabaseId, 
      conf.DrivernfoCollectionId, 
      ID.unique(),
      {
      userId:userAccount.$id,
    
      name,
      busNo
    });

    return this.login({email,password})

   }
   else {return userAccount;}
    }catch(error){
      throw error;
    }
  }
  async login({email,password}){
    try {
    return  await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser(){
    try {
      return await this.account.get()
    } catch (error) {
      console.log("no current user"); 
    }
    return null;
  }

  async logout(){
    try {
      return await this.account.deleteSessions("current");
    } catch (error) {
      console.log(error);
    }
  }
   googleLogin(){
    try {
      return this.account.createOAuth2Session(
         OAuthProvider.Google,
        
        "http://localhost:5173/searchbus",
         "http://localhost:5173/login"
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getSessions(){
    try {
     await this.account.getSession('current');
     
    } catch (error) {
      console.log(error);
    }
  }


}

const authService=new AuthService()
export default authService