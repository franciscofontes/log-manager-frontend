export interface Log {
    id: number;
    data: Date;
    ip: string;
    status: string;
    request: string;
    userAgent?: string;
}