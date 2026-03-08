'use server';

import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

export type CategoryFormData = {
  id: string; // Slug style ID, e.g. 'tech', 'fashion'
  name: string;
  icon: string; // Icon name from lucide-react or emoji
  subcategories: string[];
};

export async function createCategory(data: CategoryFormData) {
  try {
    const categories = await getCollection('categories');
    
    // Check if ID already exists
    const existing = await categories.findOne({ id: data.id });
    if (existing) {
      return { success: false, error: 'Category ID already exists' };
    }

    const result = await categories.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath('/');
    revalidatePath('/admin/categories');
    revalidatePath('/categories');

    return { success: true, categoryId: result.insertedId.toString() };
  } catch (error) {
    console.error('Error creating category:', error);
    return { success: false, error: 'Failed to create category' };
  }
}

export async function deleteCategory(id: string) {
  try {
    const categories = await getCollection('categories');
    // We use the mongodb _id for deletion to be safe, but the UI might use the 'id' field
    await categories.deleteOne({ _id: new ObjectId(id) });

    revalidatePath('/');
    revalidatePath('/admin/categories');
    revalidatePath('/categories');

    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: 'Failed to delete category' };
  }
}

export async function getAllCategories() {
  try {
    const categoriesCollection = await getCollection('categories');
    const results = await categoriesCollection.find({}).sort({ createdAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(results));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function updateCategory(mongoId: string, data: Partial<CategoryFormData>) {
  try {
    const categories = await getCollection('categories');

    await categories.updateOne(
      { _id: new ObjectId(mongoId) },
      { $set: { ...data, updatedAt: new Date() } }
    );

    revalidatePath('/');
    revalidatePath('/admin/categories');
    revalidatePath('/categories');

    return { success: true };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: 'Failed to update category' };
  }
}
