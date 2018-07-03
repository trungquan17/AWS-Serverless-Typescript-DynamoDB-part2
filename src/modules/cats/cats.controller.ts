/**
 * cats.controller.ts mô tả class CatsController - mapping url với phương thức tương ứng

    constructor khởi tạo đối tượng route và mapping các phương thức
    public create handle phương thức POST /api/v1/cats tạo mới một con mèo
    public findById handle phương thức GET /api/v1/cats/:id lấy một con mèo theo id
    private init: mapping
 */
import {NextFunction, Request, Response, Router} from 'express';
import CatRepo from './repositories/cats.repo';

class CatsController {
    private route: Router;

    constructor() {
        this.route = Router();
        this.init();
    }

    private init(): void {
        this.route
            .post('/', this.create)
            .get('/:id', this.findById);
    }

    public getRoute(): Router {
        return this.route;
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, mood } = req.body;
            console.log(req.body);
            const cat = await CatRepo.create(name, mood);
            res.status(200).json({
                data: cat,
                mesage: 'success',
                status: res.status,
            });
        } catch (error) {
            next(error);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const cat = await CatRepo.findById(id);
            res.status(200).json({
                data: cat,
                message: 'success',
                status: res.status,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new CatsController().getRoute();
