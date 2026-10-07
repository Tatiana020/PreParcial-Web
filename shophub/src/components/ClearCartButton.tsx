"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

interface ClearCartButtonProps {
  fullWidth?: boolean;
}

export default function ClearCartButton({
  fullWidth = false,
}: ClearCartButtonProps) {
  const { clearCart, items } = useCart();
  const [justRemoved, setJustRemoved] = useState(false);
  const handleClick = () => {
    clearCart();
    setJustRemoved(true);
    setTimeout(() => setJustRemoved(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`clear-cart-btn ${fullWidth ? "clear-cart-btn--full" : ""}`}
      disabled={items.length === 0}
    >
      {items.length > 0
        ? justRemoved
          ? "✓ Carrito vacío"
          : "Vaciar carrito"
        : "No hay productos en el carrito"}
    </button>
  );
}