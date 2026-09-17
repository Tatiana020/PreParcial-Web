"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalCount } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          🛍️ ShopHub
        </Link>

        <Link
          href="/carrito"
          className="cart-indicator"
          aria-label="Ver carrito de compras"
        >
          <span className="cart-indicator__icon">🛒</span>
          <span className="cart-indicator__count">{totalCount}</span>
        </Link>
      </div>
    </header>
  );
}
