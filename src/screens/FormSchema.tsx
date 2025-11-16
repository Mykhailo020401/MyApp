import { z } from 'zod';

export const formSchema = z.object({
  // formId: z.string().default(Date.now().toString()),
  // formId: z.string(),
  formName: z
    .string()
    .min(2, { message: 'Поле ім`я має містити не менше 2 символів' })
    .max(20, 'Поле ім`я має містити не більше 20 символів')
    .transform(v => v.toLowerCase().replace(/\s+/g, '_')),

  formSurname: z
    .string()
    .min(2, { message: 'Поле прізвище має містити не менше 2 символів' })
    .max(20, 'Поле прізвище має містити не більше 20 символів')
    .transform(v => v.toLowerCase().replace(/\s+/g, '_')),
  formAge: z.string().refine(
    v => {
      return Number(v) > 17 && Number(v) < 66;
    },
    {
      message: 'Возраст за пределами допустимого диапазона',
    },
    // formHasJob: z.boolean()
  ),
});

export type FormSchema = z.infer<typeof formSchema>;
