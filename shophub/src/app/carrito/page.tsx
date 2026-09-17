"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/CheckoutForm";

export default function CarritoPage() {
  const { items, totalPrice, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos desde el catálogo para continuar con tu compra.</p>
        <Link href="/" className="back-link">
          ← Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Tu carrito</h1>

      <div className="cart-page__content">
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item__thumb"
              />
              <div className="cart-item__info">
                <span className="cart-item__title">{item.title}</span>
                <span className="cart-item__qty">
                  {item.quantity} × ${item.price.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                className="cart-item__remove"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Quitar ${item.title} del carrito`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <div className="cart-summary__total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
