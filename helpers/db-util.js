import { MongoClient } from "mongodb";
const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://rawwr:kCIexrkEqPj0UFbf@cluster0.eyknml1.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
};

const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

const getAllDocuments = async (client, collection, sort, filter = {}) => {
  const db = client.db();
  //sorting by the latest

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
};

export { connectDatabase, insertDocument, getAllDocuments };
