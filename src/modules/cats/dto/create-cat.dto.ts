/**
 * mô tả class dữ liệu để tạo mới một con mèo
 */
import {IsDefined, MaxLength, MinLength} from 'class-validator';

class CreateCatDto {
    @MinLength(3, {
        message: 'Name is too short',
    })
    @MaxLength(50, {
        message: 'Name is too long'
    })
    public name: string;

    @IsDefined({
        message: 'Mood should be defined'
    })
    public mood: string;

    constructor(name: string, mood: string) {
        this.name = name;
        this.mood = mood;
    }
}

export default CreateCatDto;
