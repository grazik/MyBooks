import { fileURLToPath } from 'node:url';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Resolved through the package (exports "./schema.graphql"), not a repo path.
  schema: fileURLToPath(import.meta.resolve('@mybooks/graphql/schema.graphql')),
  documents: ['src/**/*.{ts,svelte}'],
  generates: {
    'generated/graphql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        scalars: { DateTime: "string & { readonly __brand: 'DateTime' }" },
        strictScalars: true,
      },
    },
  },
};

export default config;
