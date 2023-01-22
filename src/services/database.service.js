// External Dependencies
const mongoDB = require ("mongodb");
const connection = async () => {

  const client = new mongoDB.MongoClient("mongodb+srv://MrRichGamer:MrRichGamer.12@eco-trade.zbhmzeu.mongodb.net/?retryWrites=true&w=majority");
          
  await client.connect();
  const db = client.db('Eco-Trade');
 
  const usersCollection = db.collection("Users");
  const productsCollection = db.collection("Products");
  const chatCollection = db.collection("Chat");
      
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${productsCollection.collectionName}`);
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${chatCollection.collectionName}`);

}
exports.connection = connection;

