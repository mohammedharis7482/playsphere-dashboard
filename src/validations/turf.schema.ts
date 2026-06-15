import { z } from "zod";

export const turfSchema = z.object({
  name: z.string().min(2, "Turf name is required"),
  location: z.string().min(2, "Location is required"),
  city: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]).optional(),
});

export const updateTurfSchema = turfSchema.partial();