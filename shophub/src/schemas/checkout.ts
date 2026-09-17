import { z } from "zod";

// Single Source of Truth: el esquema define tanto las reglas de validación
// como el tipo TypeScript inferido para el formulario de checkout.
export const checkoutSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresa un correo electrónico válido"),
  direccion: z
    .string()
    .min(1, "La dirección es obligatoria")
    .min(8, "Ingresa una dirección más completa"),
  telefono: z
    .string()
    .min(7, "Ingresa un número de teléfono válido")
    .max(15, "El número de teléfono es demasiado largo"),
});

// Tipo inferido automáticamente a partir del esquema (z.infer)
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
