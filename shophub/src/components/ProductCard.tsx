import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

// Componente de servidor: no necesita estado propio, solo recibe
// el producto por props y delega la interactividad a AddToCartButton.
export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link href={`/productos/${product.id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            className="product-card__image"
            priority={priority}
          />
        </div>
        <div className="product-card__body">
          <span className="product-card__category">{product.category}</span>
          <h3 className="product-card__title">{product.title}</h3>
          <div className="product-card__meta">
            <span className="product-card__price">
              ${product.price.toFixed(2)}
            </span>
            <span className="product-card__stock">
              Stock: {product.stock}
            </span>
          </div>
        </div>
      </Link>
      <div className="product-card__footer">
        <AddToCartButton product={product} fullWidth />
      </div>
    </article>
  );
}
