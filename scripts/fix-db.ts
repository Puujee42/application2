
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGO_DB || 'Buddha';

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not set in .env file');
    process.exit(1);
}

const BROKEN_IMAGE_URL = 'https://images.unsplash.com/photo-1554941068-a252989d3652?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
// A valid Unsplash image for studio lighting
const NEW_IMAGE_URL = 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

async function fixDb() {
    const client = new MongoClient(MONGODB_URI!, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        tls: true,
        tlsAllowInvalidCertificates: true,
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(MONGO_DB);
        const collection = db.collection('products');

        // 1. Fix Broken Image
        const updateResult = await collection.updateMany(
            { image: BROKEN_IMAGE_URL },
            { $set: { image: NEW_IMAGE_URL } }
        );
        console.log(`Updated ${updateResult.modifiedCount} products with broken images.`);

        // 2. Add Indexes
        console.log('Creating indexes...');
        await collection.createIndex({ createdAt: -1 });
        await collection.createIndex({ category: 1 });


        console.log('Indexes created successfully.');

    } catch (error) {
        console.error('Error fixing database:', error);
    } finally {
        await client.close();
    }
}

fixDb();
