import * as z from 'zod';

const restaurantSchema = z.object({
  restaurantName: z.string().min(3, 'Restaurant name must be at least 3 characters long'),
  city: z.string().min(2, 'City must be at least 2 characters long'),
  country: z.string().min(2, 'Country must be at least 2 characters long'),
  deliveryTime: z
    .number()
    .min(5, 'Delivery time must be at least 5 minutes')
    .max(120, 'Delivery time cannot exceed 120 minutes'),
    cuisines: z.array(z.string().min(3, 'Each cuisine must be at least 3 characters long')),
  image: z.instanceof(File, 'Please upload a valid image file').optional(),
});

export default restaurantSchema;