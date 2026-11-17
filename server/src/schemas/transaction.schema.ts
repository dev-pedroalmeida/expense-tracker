import * as z from 'zod'

export const transactionSchema = z.object({
  type: z.enum(["expense", "income"]),
  amount: z.int(),
  description: z.string().max(255).optional(),
  date: z.iso.date().optional()
})