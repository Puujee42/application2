import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const productsCollection = await getCollection('products');
    const currentProduct = await productsCollection.findOne({ _id: new ObjectId(id) });

    if (!currentProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const similarProducts = await productsCollection
      .find({
        category: currentProduct.category,
        _id: { $ne: new ObjectId(id) }
      })
      .limit(4)
      .toArray();

    const mappedProducts = similarProducts.map(p => ({
      ...p,
      id: p._id.toString()
    }));

    return NextResponse.json({ products: mappedProducts });
  } catch (error) {
    console.error('[Similar Products API] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
