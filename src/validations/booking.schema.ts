import { z } from "zod";

export const bookingSchema = z.object({
  turfId: z.string(),
  customerId: z.string(),
  bookingDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  amount: z.number().min(1),
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
  ]),
});

export const updateBookingSchema = z.object({
  turfId: z.string().optional(),
  bookingDate: z.coerce.date().optional(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
  amount: z.number().min(1).optional(),
  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
    ])
    .optional(),
});