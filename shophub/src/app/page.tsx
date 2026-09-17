import ProductCard from "@/components/ProductCard";
import type { ProductListResponse } from "@/types/product";

const CATALOG_ENDPOINT =
  "https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock";

async function getProducts(): Promise<ProductListResponse> {
  const res = await fetch(CATALOG_ENDPOINT, {
    // Siempre trae datos frescos del catálogo en cada visita
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("No fue posible cargar el catálogo de productos");
  }

  return res.json();
}

export default async function HomePage() {
  const { products } = await getProducts();

  return (
    <div className="catalog">
      <section className="catalog__intro">
        <h1>Catálogo de productos</h1>
        <p>Explora nuestros artículos disponibles y agrégalos al carrito.</p>
      </section>

      <section className="catalog__grid">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </section>
    </div>
  );
}
