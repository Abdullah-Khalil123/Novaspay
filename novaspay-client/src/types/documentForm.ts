import z from 'zod';

export const documentFormSchema = z.object({
  area: z.string().min(2, 'Area is required'),
  email: z.email('Invalid email address'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  country: z.string().min(1, 'Country is required'),
  address: z.string().min(1, 'Address is required'),
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  headquaters: z.string().min(1, 'Headquaters is required'),
  state: z.string().min(1, 'State is required'),
  companyCity: z.string().min(1, 'Company city is required'),
  companyStreet: z.string().min(1, 'Company street is required'),

  backFacingImage: z.any().optional(),
  frontFacingImage: z.any().optional(),
});

export type DocumentFormData = z.infer<typeof documentFormSchema>;
