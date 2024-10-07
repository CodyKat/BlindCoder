import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config();

const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD
const HOST = process.env.MONGO_HOST
const PORT = process.env.MONGO_PORT

const uri = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/?authSource=admin`;

const mongoClient= new MongoClient(uri);

export default mongoClient;