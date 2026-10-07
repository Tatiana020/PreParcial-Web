"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

interface RemoveFromCartButtonProps {
  product: Product;
  fullWidth?: boolean;
}

export default function RemoveFromCartButton({
  product,
  fullWidth = false,
}: RemoveFromCartButtonProps) {
  const { removeFromCart, items } = useCart();   // ← una sola vez, con items incluido
  const [justRemoved, setJustRemoved] = useState(false);

  const isInCart = items.some((item) => item.id === product.id);

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
      disabled={!isInCart}
    >
      {isInCart
        ? justRemoved
          ? "✓ Quitado"
          : "Quitar del carrito"
        : "No está en el carrito"}
    </button>
  );
}