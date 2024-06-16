export class Product{
    id: number;
    name: string;
    description: string;
    style_ID: number;
    size_ID: number;
    stock: number;
    createdBy: string;
    styleName: string;
    sizeName: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.style_ID = 0;
        this.size_ID = 0;
        this.stock = 0;
        this.createdBy = '';
        this.styleName = '';
        this.sizeName = '';
    }
}