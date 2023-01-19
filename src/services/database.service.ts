// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections1: { User?: mongoDB.Collection } = {}
export const collections2: { Product?: mongoDB.Collection } = {}
// Initialize Connection
export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb+srv://MrRichGamer:MrRichGamer.12@eco-trade.zbhmzeu.mongodb.net/?retryWrites=true&w=majority");
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
 
  const usersCollection: mongoDB.Collection = db.collection("Users");
  const productsCollection: mongoDB.Collection = db.collection("Products");

collections1.User = usersCollection;
collections2.Product = productsCollection;
     
       console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}