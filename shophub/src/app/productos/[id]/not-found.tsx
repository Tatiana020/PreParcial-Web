import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="not-found">
      <h1>Producto no encontrado</h1>
      <p>El producto que buscas no existe o fue removido del catálogo.</p>
      <Link href="/" className="back-link">
        ← Volver al catálogo
      </Link>
    </div>
  );
}
