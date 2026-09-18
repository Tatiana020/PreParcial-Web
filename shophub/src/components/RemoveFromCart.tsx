
import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

interface RemoveFromCartButtonProps {
  product: Product;
  fullWidth?: boolean;
}

export default function RemoveFromButton({
  product,
  fullWidth = false,
}: RemoveFromCartButtonProps) {
  const { removeFromCart } = useCart();
  const [justRemoved, setJustRemoved] = useState(false);

  const handleClick = () => {
    removeFromCart(product.id);
    setJustRemoved(true);
    setTimeout(() => setJustRemoved(false), 1200);
  };


  return (
    <button
      type="button"
      onClick={handleClick}
      className={`remove-from-cart-btn ${fullWidth ? "remove-from-cart-btn--full" : ""}`}
      disabled={product.stock <= 0}
    >
      {product.stock > 0
        ? "No hay prodcuto en el carrito"
        : justRemoved
        ? "✓ Quitado"
        : "Quitado del carrito"}
    </button>
  );
}