import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { writeFile } from 'node:fs/promises';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { resolve } from 'node:path';

const HEADER = `# Generated from apps/api by \`pnpm schema\`. Do not edit by hand.
# CI fails if this file differs from the schema the API builds.

`;

const getOutputPath = (): string => {
  const [outputPath, ...extra] = process.argv.slice(2);
  if (!outputPath || extra.length > 0) {
    throw new Error(
      'Usage: node --env-file=../../.env.example dist/gqlSchemaEmitter.js <output-path> (normally via: pnpm schema)',
    );
  }
  return resolve(outputPath);
};

const emitSchema = async () => {
  const outputPath = getOutputPath();

  const app = await NestFactory.createApplicationContext(AppModule, {
    abortOnError: false,
    logger: ['error', 'warn'],
  });

  try {
    const gqlSchema = app.get(GraphQLSchemaHost).schema;
    await writeFile(outputPath, `${HEADER}${printSchema(gqlSchema)}\n`, 'utf8');
    console.log(`Schema written to '${outputPath}'`);
  } finally {
    await app.close();
  }
};

await emitSchema();
