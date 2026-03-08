
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

async function checkUser() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('No MONGODB_URI found');
        return;
    }
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('Soyloo');
        const user = await db.collection('users').findOne({ phone: '95562289' });
        console.log('User found:', user);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkUser();
