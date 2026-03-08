import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import ProductDetailClient from '@/components/ProductDetailClient';

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const products = await getCollection('products');
    const product = await products.findOne({ _id: new ObjectId(id) });

    if (!product) {
      notFound();
    }

    const relatedProducts = await products
      .find({
        category: product.category,
        _id: { $ne: product._id }
      })
      .limit(4)
      .toArray();

    const mappedRelatedProducts = relatedProducts.map(p => ({
      id: p._id.toString(),
      name: p.name,
      image: p.image || '',
      price: p.price,
      rating: p.rating || 0,
      category: p.category,
      featured: p.featured,
      wholesale: p.wholesale,
      stockStatus: p.stockStatus,
      inventory: p.inventory
    }));

    const productData = {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stockStatus: product.stockStatus || product.stock_status || 'in-stock',
      inventory: product.inventory ?? 0,
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
      rating: 4.5,
      relatedProducts: mappedRelatedProducts,
    };

    return <ProductDetailClient product={productData} />;
  } catch {
    notFound();
  }
}
