import { MatPaginatorIntl } from "@angular/material";

export class PaginatorBR extends MatPaginatorIntl {
    constructor() {
        super();
        this.itemsPerPageLabel = "Itens por pagina";
        this.nextPageLabel = "Proxima pagina";
        this.previousPageLabel = "Pagina anterior";
        this.firstPageLabel = "Primeira pagina";
        this.lastPageLabel = "Ultima pagina";
    }
}