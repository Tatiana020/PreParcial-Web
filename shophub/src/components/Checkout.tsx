"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useCart } from "@/context/CartContext";

interface CheckoutFormProps {
  onOrderComplete: () => void;
}

interface CheckoutFormData {
  nombre: string;
  correo: string;
  metodoPago: string;
  aceptaTerminos: boolean;
}

const INITIAL_FORM_DATA: CheckoutFormData = {
  nombre: "",
  correo: "",
  metodoPago: "",
  aceptaTerminos: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function submitOrder(data: CheckoutFormData): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1200);
  });
}

export default function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const { clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM_DATA);
  const [touched, setTouched] = useState({ nombre: false, correo: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNombreValid = formData.nombre.trim().length >= 5;
  const isCorreoValid = EMAIL_REGEX.test(formData.correo);
  const isMetodoPagoValid = formData.metodoPago !== "";
  const isFormValid =
    isNombreValid && isCorreoValid && isMetodoPagoValid && formData.aceptaTerminos;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "nombre" || name === "correo") {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitOrder(formData);
      clearCart();
      setFormData(INITIAL_FORM_DATA);
      setTouched({ nombre: false, correo: false });
      onOrderComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <h2>Datos de facturación</h2>

      <div className="form-field">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.nombre && !isNombreValid && (
          <span className="form-error">
            El nombre debe tener al menos 5 caracteres
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="correo">Correo de facturación</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.correo && !isCorreoValid && (
          <span className="form-error">Ingresa un correo electrónico válido</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="metodoPago">Método de pago</label>
        <select
          id="metodoPago"
          name="metodoPago"
          value={formData.metodoPago}
          onChange={handleChange}
        >
          <option value="">Selecciona un método</option>
          <option value="tarjeta_credito">Tarjeta de crédito</option>
          <option value="tarjeta_debito">Tarjeta de débito</option>
          <option value="pse">PSE</option>
          <option value="efectivo">Efectivo contra entrega</option>
        </select>
      </div>

      <div className="form-field form-field--checkbox">
        <label>
          <input
            type="checkbox"
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onChange={handleChange}
          />
          Acepto los términos y condiciones
        </label>
      </div>

      <button
        type="submit"
        className="checkout-submit-btn"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Procesando pedido..." : "Confirmar pedido"}
      </button>
    </form>
  );
}