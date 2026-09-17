"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  fullWidth?: boolean;
}

export default function AddToCartButton({
  product,
  fullWidth = false,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`add-to-cart-btn ${fullWidth ? "add-to-cart-btn--full" : ""}`}
      disabled={product.stock <= 0}
    >
      {product.stock <= 0
        ? "Agotado"
        : justAdded
        ? "✓ Agregado"
        : "Agregar al carrito"}
    </button>
  );
}
