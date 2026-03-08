
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

const products = [
    {
        name: 'Sony Alpha a7 IV Mirrorless Camera',
        image: 'https://placehold.co/1000x667/333/FFF?text=Sony+Alpha+a7+IV',
        price: 2498,
        rating: 4.9,
        category: 'Cameras',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 15,
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Canon EOS R5 Mirrorless Camera',
        image: 'https://placehold.co/1000x667/333/FFF?text=Canon+EOS+R5',
        price: 3899,
        rating: 4.8,
        category: 'Cameras',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 8,
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Nikon Z9 Flagship Mirrorless',
        image: 'https://placehold.co/1000x667/333/FFF?text=Nikon+Z9',
        price: 5496,
        rating: 5.0,
        category: 'Cameras',
        featured: false,
        stockStatus: 'pre-order',
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Fujifilm X-T5 Mirrorless Camera',
        image: 'https://placehold.co/1000x667/333/FFF?text=Fujifilm+X-T5',
        price: 1699,
        rating: 4.7,
        category: 'Cameras',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 20,
        wholesale: true,
        createdAt: new Date(),
    },
    {
        name: 'DJI Mavic 3 Cine Premium Combo',
        image: 'https://placehold.co/1000x667/333/FFF?text=DJI+Mavic+3+Cine',
        price: 4999,
        rating: 4.9,
        category: 'Drones',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 5,
        wholesale: true,
        createdAt: new Date(),
    },
    {
        name: 'DJI Mini 3 Pro Drone',
        image: 'https://placehold.co/1000x667/333/FFF?text=DJI+Mini+3+Pro',
        price: 759,
        rating: 4.8,
        category: 'Drones',
        featured: false,
        stockStatus: 'in-stock',
        inventory: 30,
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Sigma 24-70mm f/2.8 Art DG DN Lens',
        image: 'https://placehold.co/1000x667/333/FFF?text=Sigma+24-70mm',
        price: 1099,
        rating: 4.7,
        category: 'Lenses',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 25,
        wholesale: true,
        createdAt: new Date(),
    },
    {
        name: 'Sony FE 70-200mm f/2.8 GM OSS II',
        image: 'https://placehold.co/1000x667/333/FFF?text=Sony+70-200mm',
        price: 2798,
        rating: 4.9,
        category: 'Lenses',
        featured: false,
        stockStatus: 'in-stock',
        inventory: 12,
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Canon RF 50mm f/1.2 L USM',
        image: 'https://placehold.co/1000x667/333/FFF?text=Canon+RF+50mm',
        price: 2299,
        rating: 4.8,
        category: 'Lenses',
        featured: false,
        stockStatus: 'pre-order',
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Aputure LS 600d Pro Light Storm',
        image: 'https://placehold.co/1000x667/333/FFF?text=Aputure+LS+600d',
        price: 1890,
        rating: 4.9,
        category: 'Lighting',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 10,
        wholesale: true,
        createdAt: new Date(),
    },
    {
        name: 'Aputure MC RGBWW Mini LED',
        image: 'https://placehold.co/1000x667/333/FFF?text=Aputure+MC',
        price: 90,
        rating: 4.7,
        category: 'Lighting',
        featured: false,
        stockStatus: 'in-stock',
        inventory: 45,
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Rode Wireless GO II Microphone System',
        image: 'https://placehold.co/1000x667/333/FFF?text=Rode+Wireless+GO+II',
        price: 299,
        rating: 4.8,
        category: 'Audio',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 50,
        wholesale: true,
        createdAt: new Date(),
    },
    {
        name: 'Sennheiser MKH 416 Shotgun Mic',
        image: 'https://placehold.co/1000x667/333/FFF?text=Sennheiser+MKH+416',
        price: 999,
        rating: 5.0,
        category: 'Audio',
        featured: false,
        stockStatus: 'in-stock',
        inventory: 15,
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Blackmagic Pocket Cinema Camera 6K Pro',
        image: 'https://placehold.co/1000x667/333/FFF?text=BMPCC+6K+Pro',
        price: 2535,
        rating: 4.8,
        category: 'Cameras',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 8,
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'Atomos Ninja V 5" Recording Monitor',
        image: 'https://placehold.co/1000x667/333/FFF?text=Atomos+Ninja+V',
        price: 499,
        rating: 4.6,
        category: 'Monitors',
        featured: false,
        stockStatus: 'in-stock',
        inventory: 25,
        wholesale: true,
        createdAt: new Date(),
    },
    {
        name: 'SmallHD Cine 7 Touchscreen Monitor',
        image: 'https://placehold.co/1000x667/333/FFF?text=SmallHD+Cine+7',
        price: 1799,
        rating: 4.7,
        category: 'Monitors',
        featured: false,
        stockStatus: 'pre-order',
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'GoPro HERO12 Black Action Camera',
        image: 'https://placehold.co/1000x667/333/FFF?text=GoPro+HERO12',
        price: 399,
        rating: 4.7,
        category: 'Action Cameras',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 100,
        wholesale: true,
        createdAt: new Date(),
    },
    {
        name: 'Insta360 X3 360 Camera',
        image: 'https://placehold.co/1000x667/333/FFF?text=Insta360+X3',
        price: 449,
        rating: 4.5,
        category: 'Action Cameras',
        featured: false,
        stockStatus: 'in-stock',
        inventory: 40,
        wholesale: false,
        createdAt: new Date(),
    },
    {
        name: 'DJI RS 3 Pro Gimbal Stabilizer',
        image: 'https://placehold.co/1000x667/333/FFF?text=DJI+RS+3+Pro',
        price: 869,
        rating: 4.9,
        category: 'Accessories',
        featured: true,
        stockStatus: 'in-stock',
        inventory: 18,
        wholesale: true,
        createdAt: new Date(),
    },
    {
        name: 'Peak Design Everyday Backpack V2',
        image: 'https://placehold.co/1000x667/333/FFF?text=Peak+Design+Backpack',
        price: 279,
        rating: 4.8,
        category: 'Accessories',
        featured: false,
        stockStatus: 'in-stock',
        inventory: 35,
        wholesale: false,
        createdAt: new Date(),
    }
];

async function seed() {
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

        // Optional: Clear existing products
        await collection.deleteMany({});
        console.log('Cleared existing products');

        const result = await collection.insertMany(products);
        console.log(`Inserted ${result.insertedCount} products`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.close();
    }
}

seed();
