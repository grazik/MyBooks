import { graphql } from '#graphql';

graphql(`
  query Books {
    books {
      title
      id
      createdAt
    }
  }
`);
