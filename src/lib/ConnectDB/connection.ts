import mongoose from "mongoose";

export const ConnectDB = async () => {
  const options = { dbName: "ecommerce" };
  const connection = mongoose.connection;
  try {
    await mongoose.connect(process.env.MONGO_URI || "", options);
    console.log(
      `Database Connected at ${connection.host}:${connection.port}/${connection.name}`
    );
  } catch (error) {
    console.log(`DB connection Failed !`);
  }
};
