import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.coerce.number().int().min(2000).default(3000),
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
});

export type Env = z.infer<typeof EnvSchema>;
