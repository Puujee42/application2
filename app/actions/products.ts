'use server';

import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  sections?: string[];
  image: string;
  images?: string[];
  category: string;
  stockStatus: string;
  inventory: number;
  brand?: string;
  model?: string;
  delivery?: string;
  paymentMethods?: string;
  attributes?: Record<string, string>;
  featured?: boolean;
};

export async function createProduct(data: ProductFormData) {
  try {
    const { userId, role } = await auth();
    if (!userId || role !== 'admin') {
      return { success: false, error: 'Зөвшөөрөлгүй' };
    }

    const products = await getCollection('products');
    const result = await products.insertOne({
      ...data,
      inventory: Number(data.inventory) || 0, // Ensure strictly number
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/ready-to-ship');
    revalidatePath('/pre-order');

    return { success: true, productId: result.insertedId.toString() };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { userId, role } = await auth();
    if (!userId || role !== 'admin') {
      return { success: false, error: 'Зөвшөөрөлгүй' };
    }

    const products = await getCollection('products');
    await products.deleteOne({ _id: new ObjectId(productId) });

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/ready-to-ship');
    revalidatePath('/pre-order');

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}

export async function getAllProducts() {
  try {
    const products = await getCollection('products');
    const results = await products.find({}).sort({ createdAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(results));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function updateProduct(productId: string, data: Partial<ProductFormData>) {
  try {
    const { userId, role } = await auth();
    if (!userId || role !== 'admin') {
      return { success: false, error: 'Зөвшөөрөлгүй' };
    }

    const products = await getCollection('products');

    // Sanitize inventory if it exists in the update
    const updateData = { ...data };
    if (updateData.inventory !== undefined) {
      updateData.inventory = Number(updateData.inventory);
    }

    await products.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/ready-to-ship');
    revalidatePath('/pre-order');

    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: 'Failed to update product' };
  }
}
