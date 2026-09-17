import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import type { ProductDetail } from "@/types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<ProductDetail | null> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("No fue posible cargar el detalle del producto");
  }

  return res.json();
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="product-detail">
      <Link href="/" className="back-link">
        ← Volver al catálogo
      </Link>

      <div className="product-detail__content">
        <div className="product-detail__image-wrapper">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="product-detail__image"
            priority
          />
        </div>

        <div className="product-detail__info">
          <span className="product-detail__category">
            {product.category}
            {product.brand ? ` · ${product.brand}` : ""}
          </span>
          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__meta">
            <span className="product-detail__price">
              ${product.price.toFixed(2)}
            </span>
            <span className="product-detail__stock">
              Stock disponible: {product.stock}
            </span>
          </div>

          <p className="product-detail__description">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
