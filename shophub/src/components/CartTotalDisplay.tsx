"use client";

import { useCart } from "@/context/CartContext";

export default function CartTotalDisplay() {
  const { totalPrice } = useCart();
  return <span className="cart-indicator__count">${totalPrice.toFixed(2)}</span>;
}