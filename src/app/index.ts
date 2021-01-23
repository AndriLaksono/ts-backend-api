import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './errors';
import routes from './routes';

export default (app: Application): void => {
    // Middleware

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Api Handling

    Object.keys(routes).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.use('/v1/api', (routes as any)[key]);
    });

    // Error Handling

    app.use(errorHandler);

    // Unhandling Rejection Expection

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
        console.log(p);
        throw reason;
    });

    process.on('uncaughtException', (error: Error) => {
        console.log(error);
        process.exit(1);
    });
};
