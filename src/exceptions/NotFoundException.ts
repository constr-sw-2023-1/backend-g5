import { HttpStatus } from "@nestjs/common";
import BaseException from "./BaseException";

class NotFoundException implements BaseException {
    source: string = 'Rooms API';
    message: string = 'Resource Not Found';
    status: HttpStatus = HttpStatus.NOT_FOUND;
    code: string = 'G5-404'
    stack?: string[];

}

export default NotFoundException;