import mongoose from 'mongoose';

async function connect() {
    try {
        const atlasUri = process.env.ATLAS_URI;
        if (!atlasUri) {
            console.error("ATLAS_URI not defined in environment variables.");
            process.exit(1);
        }

        const db = await mongoose.connect(atlasUri);

        console.log("Connected to MongoDB Atlas");
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connect;
