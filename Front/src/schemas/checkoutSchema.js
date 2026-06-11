import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(2, "Ingrese un nombre válido"),

  lastName: z
    .string()
    .min(2, "Ingrese un apellido válido"),

  dni: z
    .string()
    .min(7, "DNI inválido"),

  phone: z
    .string()
    .min(8, "Teléfono inválido"),

  address: z
    .string()
    .min(5, "Ingrese una dirección"),

  cardHolder: z
    .string()
    .min(3, "Ingrese el titular"),

  cardNumber: z
    .string()
    .min(16, "La tarjeta debe tener 16 dígitos")
    .max(19),

  expiryDate: z
    .string()
    .min(5, "Formato MM/AA"),

  cvv: z
    .string()
    .min(3, "CVV inválido")
    .max(4)
});