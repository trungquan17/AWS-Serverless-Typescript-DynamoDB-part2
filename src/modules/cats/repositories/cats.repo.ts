/**
 * repositories/cats.repo.ts mô tả class CatsRepo - làm việc với bảng cats

    public create tạo mới một con mèo
    public findById tìm một con mèo theo Id
 */
import {validate} from 'class-validator';
import * as uuid from 'uuid';

import CreateCatDto from '../dto/create-cat.dto';
import ICat from '../interfaces/cat.interface';
import Connection from '../../../shared/dynamoDBConnection';

class CatsRepo {
    private tableName: string;

    constructor() {
        this.tableName = process.env.CATS_TABLE || 'cats';
    }

    public async create(name: string, mood: string): Promise<ICat> {
        const catDto = new CreateCatDto(name, mood);
        const errors = await validate(catDto, {validationError: { target: false }});
        if(errors.length > 0) {
            return Promise.reject({ status: 400, message: 'Cat data is not valid!' });
        }
        const params = {
            Item: {
                id: uuid.v4(),
                mood: catDto.mood,
                name: catDto.name,
            },
            TableName: this.tableName,
        };

        return Connection.create<ICat>(params);
    }

    public async findById(id: string): Promise<ICat> {
        const params = {
            Key: {
                id,
            },
            TableName: this.tableName,
        };
        let cat = await Connection.findById<ICat>(params);
        if(!cat) {
            return Promise.reject({ status: 404, message: 'No cat found with the given id.' });
        }

        return cat;
    }
}

export default new CatsRepo();
