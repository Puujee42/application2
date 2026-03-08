
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config(); // Load .env by default

async function checkProducts() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('No MONGODB_URI found');
        return;
    }
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('Soyloo'); // Assuming database name from previous context or connection string
        // Actually, connection string usually contains DB name, but let's check
        // The previous code used getCollection helper which uses process.env.MONGODB_DB or default
        // I'll just use the client directly and list databases first if needed, but assuming 'test' or whatever is in URI
        // Wait, the previous code used `client.db('Soyloo')`. Let's stick with that or check .env
        
        const products = await db.collection('products').find({ 
            $or: [
                { name: { $regex: /Sony/i } },
                { description: { $regex: /Sony/i } }
            ]
        }).limit(5).toArray();
        
        console.log(`Found ${products.length} products matching "Sony":`);
        products.forEach(p => console.log(`- ${p.name} (${p._id})`));
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkProducts();
