export interface Log {
    id: number;
    dataCadastro:Date,
    nomeArquivo:string,
    data: Date;
    ip: string;
    status: string;
    request: string;
    userAgent?: string;
}