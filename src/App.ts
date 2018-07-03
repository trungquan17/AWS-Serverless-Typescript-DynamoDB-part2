/**
 * src/App.js file này export ra một instance ứng dụng express. Class App mô tả một ứng dụng express,

    constructor sẽ khởi tạo và gọi các hàm định nghĩa của ứng dụng
    Phương thức private configureApp cấu hình ứng dụng
    hương thức private mountRoutes thực hiện mapping url với controller
 */
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import {Application, Request, Response, NextFunction, Router} from "express";

import CatsController from './modules/cats/cats.controller';

interface ErrorRequest {
    status?: number;
    message?: string;
}

class App {
    private express: Application;

    constructor() {
        this.express = express();
        this.configureApp();
        this.mountRoutes();
    }

    public getExpress(): Application {
        return this.express;
    }

    private configureApp(): void {
        this.express.use(logger('dev'));
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
        });
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private mountRoutes(): void {
        const route = Router();
        route.get('/', (req: Request, res: Response, next: NextFunction) => {
            console.log('123');
            res.json({
                message: 'Hello World!',
            });
        });
        this.express.use('/', route);

        //Cấu hình API routes
        this.express.use('/api/v1/cats', CatsController);

        //404
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({message: 'Not found.'});
        });

        //5xx
        this.express.use((err: ErrorRequest, req: Request, res: Response, next: NextFunction) => {
            res.status(err.status || 500).json({message: err.message || 'Internal Server Error.'});
        });
    }
}

// new App().getExpress().listen(3000);
export default new App().getExpress();
