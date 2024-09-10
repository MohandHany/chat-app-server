import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the MONGODB_URI environment variable.
 * If the connection fails, logs the error and exits the process.
 * @returns {Promise<void>} - A promise that resolves once the connection is established.
 */
const dbConnect = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI!);

    // eslint-disable-next-line no-console
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // Exit the process if the connection fails.
    // This is a temporary solution until we implement a retry mechanism.
    process.exit();
  }
};

export default dbConnect;
