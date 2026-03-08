'use client';

import { type Product } from '@/models/Product';
import MobileProductCard from './MobileProductCard';

interface MobileProductGridProps {
    products: Product[];
}

export default function MobileProductGrid({ products }: MobileProductGridProps) {
    return (
        <div className="grid grid-cols-2 gap-3 px-3 pb-32">
            {products.map((product) => (
                <MobileProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
