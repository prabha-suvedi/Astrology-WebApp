import mongoose from "mongoose";

const userDB_URI = process.env.MONGODB_USER_URI || "mongodb://localhost:27017/userDB";
const kundaliDB_URI = process.env.MONGODB_KUNDALI_URI || "mongodb://localhost:27017/kundali-matching";

const connections = {};

export async function connectDB(dbName = "userDB") {
  try {
    if (connections[dbName]) {
      console.log(`✅ Using existing connection for ${dbName}`);
      return connections[dbName];
    }

    const dbURI = dbName === "kundali-matching" ? kundaliDB_URI : userDB_URI;

    const connection = await mongoose.createConnection(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connections[dbName] = connection;
    console.log(`✅ MongoDB connected successfully to ${dbName}`);

    return connection;
  } catch (error) {
    console.error(`❌ MongoDB connection error for ${dbName}:`, error);
    throw new Error(`Failed to connect to MongoDB - ${dbName}`);
  }
}
