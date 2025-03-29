import { z } from "zod";

export const createOrderDto = z.object({
  userId: z.string(),
  orderProducts: z
    .object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
    .array(),
  address: z.object({
    fname: z.string().min(1),
    lname: z.string().min(1),
    line_1: z.string().min(1),
    line_2: z.string().optional(),
    city: z.string().min(1),
    phone: z.string().optional(),
  }),
});