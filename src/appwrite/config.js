import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("APPWRITE_SERVICE :: CREATE_POST :: ERROR -> ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      content = content.toString();
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("APPWRITE_SERVICE :: UPDATE_POST :: ERROR -> ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, slug);
      return true;
    } catch (error) {
      console.log("APPWRITE_SERVICE :: DELETE_POST :: ERROR -> ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("APPWRITE_SERVICE :: GET_POST :: ERROR -> ", error);
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("APPWRITE_SERVICE :: GET_ALL_POST :: ERROR -> ", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketID, ID.unique(), file);
    } catch (error) {
      console.log("APPWRITE_SERVICE :: UPLOAD_FILE :: ERROR -> ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("APPWRITE_SERVICE :: DELETE_FILE :: ERROR -> ", error);
      return false;
    }
  }

  previewFile(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketID, fileId);
    } catch (error) {
      console.log("APPWRITE_SERVICE :: PREVIEW_FILE :: ERROR -> ", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
