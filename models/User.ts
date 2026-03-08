import { ObjectId } from 'mongodb';

export interface Address {
    id: string;
    label?: string; // 'Home', 'Work', etc.
    city: string;
    district: string;
    khoroo: string;
    street: string;
    entrance?: string;
    floor?: string;
    door?: string;
    note?: string;
    isDefault: boolean;
}

export interface User {
    _id?: ObjectId;
    phone: string;
    role: 'admin' | 'user' | 'vendor';
    status: 'available' | 'in-call';
    name?: string;
    email?: string;
    image?: string;
    addresses?: Address[];
    lastSeen?: Date;
    createdAt: Date;
    updatedAt: Date;
}
