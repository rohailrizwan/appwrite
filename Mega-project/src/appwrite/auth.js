import config from "../ConfigVariable/config.js";
import { Client, Account, ID } from "appwrite";
import { login } from "../slice/authslice.js";


export class AuthService {
    Client = new Client()
    account
    
    constructor() {
        this.Client
            .setEndpoint('https://cloud.appwrite.io/v1')   // This should be your Appwrite server URL
            .setProject(config.projectId); // This should be your Appwrite project ID
        this.account = new Account(this.Client);
    }
    
    async createAccount({ name, email, password }) {
        try {
            const useraccount = await this.account.create(ID.unique(), email, password, name);
            console.log(useraccount);
            
            if (useraccount) {
                await this.Login({ email, password });
                return useraccount;  // Return useraccount after successful login
            } 
        } catch (error) {
            console.log(error);
            
        }
    }
   
    async Login({ email, password }) {
        try {
            const account = await this.account.createEmailPasswordSession(email,password)
            console.log(account);
            
        } catch (error) {
            console.log(error);
            
        }
    }

   async getCurrentuser() {
    try {
        const user = await this.account.get();  // Fetch the current user data
        return user;  // Return the user data if the request is successful
    } catch (error) {
        console.log(error);
        ;  // Re-throw the error to be handled by the calling function
    }
}

    async Logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

}

const authService = new AuthService()
export default authService 