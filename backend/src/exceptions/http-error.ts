export class HttpError extends Error {
    statusCode: number;
    details?: any;
    code?: string;

    constructor(message: string, statusCode: number, details?: any, code?: string) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
