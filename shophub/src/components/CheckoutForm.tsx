"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { checkoutSchema, type CheckoutFormValues } from "@/schemas/checkout";
import { useCart } from "@/context/CartContext";

// Simula el envío del pedido a un backend. Usa Promise + setTimeout para
// representar una llamada asíncrona real sin bloquear el hilo principal.
function submitOrder(data: CheckoutFormValues): Promise<{ orderId: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ orderId: Math.random().toString(36).slice(2, 10).toUpperCase() });
    }, 1200);
  });
}

export default function CheckoutForm() {
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    // Conecta la validación de Zod con React Hook Form
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    // async/await: la interfaz sigue respondiendo mientras la promesa está pendiente,
    // gracias al Event Loop. isSubmitting se activa automáticamente durante este tiempo.
    const result = await submitOrder(data);
    setOrderId(result.orderId);
    clearCart();
    reset();
  };

  if (orderId) {
    return (
      <div className="checkout-success">
        <h3>¡Pedido confirmado!</h3>
        <p>
          Tu número de orden es <strong>{orderId}</strong>. Te enviamos la
          confirmación al correo registrado.
        </p>
      </div>
    );
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3>Datos de envío</h3>

      <div className="form-field">
        <label htmlFor="nombre">Nombre completo</label>
        {/* register conecta el input al formulario mediante una referencia (useRef interno),
            sin necesidad de useState ni onChange manual */}
        <input id="nombre" type="text" {...register("nombre")} />
        {errors.nombre && (
          <span className="form-error">{errors.nombre.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email">Correo electrónico</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && (
          <span className="form-error">{errors.email.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="direccion">Dirección de envío</label>
        <input id="direccion" type="text" {...register("direccion")} />
        {errors.direccion && (
          <span className="form-error">{errors.direccion.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="telefono">Teléfono de contacto</label>
        <input id="telefono" type="tel" {...register("telefono")} />
        {errors.telefono && (
          <span className="form-error">{errors.telefono.message}</span>
        )}
      </div>

      <button type="submit" className="add-to-cart-btn" disabled={isSubmitting}>
        {isSubmitting ? "Enviando pedido..." : "Confirmar pedido"}
      </button>
    </form>
  );
}
