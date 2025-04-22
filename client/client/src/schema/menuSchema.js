import { z } from "zod";

const menuSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  menuImage: z.any().optional(), // Allows file uploads
});

export default menuSchema;
