import config from "../ConfigVariable/config";

import {ID,Client,Databases,Storage,Query} from 'appwrite'

export class ServiceApp{
    Client=new Client()
    databases;
    bucket;
    constructor(){
        this.Client
            .setEndpoint(config.appurl)
            .setEndpoint(config.projectId)
            this.databases=new Databases(this.Client)
            this.bucket=new Storage(this.Client)
    }

    async createPost({title,feature_img,slug,content,status,userid}){
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionID,
                slug,
                {
                    title,
                    feature_img,
                    content,
                    status,
                    userid
                }
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug,{title,feature_img,content,status}){
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionID,
                slug,
                {
                    title,
                    feature_img,
                    content,
                    status,
                    
                }
            )
        } catch (error) {
            throw error
        }
    }
    async Deletepost(slug){
        try {
            return await this.databases.deleteDocument(
                config.databaseId,
                config.collectionID,
                slug
            )
        } catch (error) {
            throw error
        }
    }
    async getDocument(slug){
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionID,
                slug
            )
        } catch (error) {
            throw error
        }
    }
    async getPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionID,
                query // Pass the query array correctly here
            );
        } catch (error) {
            throw error;
        }
    }
    
    async Uploadfile(file){
        try {
            return await this.bucket.createFile(
                config.bucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }
    async Deletefile(fileId){
        try {
            return await this.bucket.deleteFile(
                config.bucketID,
                fileId
            )
        } catch (error) {
            throw error
        }
    }
    async getfilepreview(fileId) {
        try {
            return await this.bucket.getFilePreview(
                config.bucketID,
                fileId
            );
        } catch (error) {
            console.error('Error fetching file preview:', error);  // Log the error for debugging
            throw error;  // Optionally rethrow it if it needs to be handled elsewhere
        }
    }
    

}

const Service=new ServiceApp
export default Service