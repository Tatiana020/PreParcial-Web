"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/Checkout";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (orderCompleted) {
    return (
      <div className="checkout-page checkout-page--state">
        <h1>¡Pedido confirmado!</h1>
        <p>Gracias por tu compra. Procesaremos tu orden en las próximas horas.</p>
        <Link href="/" className="back-link">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page checkout-page--state">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos desde el catálogo antes de continuar al checkout.</p>
        <Link href="/" className="back-link">
          ← Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Finalizar compra</h1>

      <div className="checkout-page__content">
        <section className="checkout-summary">
          <h2>Resumen de tu orden</h2>

          <ul className="checkout-summary__list">
            {items.map((item) => (
              <li key={item.id} className="checkout-summary__item">
                <span className="checkout-summary__title">{item.title}</span>
                <span className="checkout-summary__qty">
                  {item.quantity} × ${item.price.toFixed(2)}
                </span>
                <span className="checkout-summary__subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="checkout-summary__total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </section>

        <CheckoutForm onOrderComplete={() => setOrderCompleted(true)} />
      </div>
    </div>
  );
}