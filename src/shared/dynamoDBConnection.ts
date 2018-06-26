/**
 * src/shared/dynamoDbConnection.ts thực hiện việc kết nối và thư thi trên cơ sở dữ liệu Dynamodb

    constructor thực hiện việc định nghĩa cấu hình kết nối, tạo ra đối tượng document client
    public create thêm mới dữ liệu vào 1 bảng
    public findById tìm một đối trượng trong 1 bảng theo id
 */
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

class Connection {
    private dynamoDB: DocumentClient;

    constructor() {
        if(process.env.IS_OFFLINE === 'true') {
            this.dynamoDB = new DocumentClient({
                endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
                region: 'localhost'
            });
        } else {
            this.dynamoDB = new DocumentClient();
        }
    }

    public create<T>(params: DocumentClient.PutItemInput): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.dynamoDB.put(params, (err,data) => {
                if(err) {
                    return reject(err);
                }
                resolve(params.Item as T);
            });
        });
    }

    public findById<T>(params: DocumentClient.GetItemInput): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.dynamoDB.get(params, (err, data) => {
                if(err) {
                    return reject(err);
                }
                resolve(data.Item as T || null);
            });
        });
    }
}

export default new Connection();
