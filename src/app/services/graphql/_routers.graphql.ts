import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { Schema } from './schema.graphql';
import { Resolvers } from './resolver.graphql';

const router = Router();

router.use(
    '/',
    graphqlHTTP({
        schema: Schema,
        rootValue: Resolvers,
        graphiql: true, // GUI
    }),
);

export default router;
