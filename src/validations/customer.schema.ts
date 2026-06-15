import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Customer name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

export const updateCustomerSchema = customerSchema.partial();