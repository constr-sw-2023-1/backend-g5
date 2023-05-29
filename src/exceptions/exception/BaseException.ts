import { HttpStatus } from '@nestjs/common';

interface BaseException {
    source: string;
    message: string;
    status: HttpStatus;
    code: string;
    stack?: string[];
}

export default BaseException;
