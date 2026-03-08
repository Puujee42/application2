import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const categories = await getCollection('categories');
    // Try finding by id (slug) first, as per schema
    let category = await categories.findOne({ id: slug });
    
    // Fallback to finding by 'slug' field if 'id' not found (legacy support)
    if (!category) {
        category = await categories.findOne({ slug });
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, icon, subcategories } = body;

    const categories = await getCollection('categories');
    
    // Check if category exists
    const existing = await categories.findOne({ id: slug });
    if (!existing) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const updateData: any = { updatedAt: new Date() };
    if (name) updateData.name = name;
    if (icon) updateData.icon = icon;
    if (subcategories) updateData.subcategories = subcategories;

    await categories.updateOne(
      { id: slug },
      { $set: updateData }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const categories = await getCollection('categories');
    
    const result = await categories.deleteOne({ id: slug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
