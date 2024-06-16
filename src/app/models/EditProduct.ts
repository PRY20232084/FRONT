export class EditProduct{
    id: number;
    name: string;
    description: string;
    size_ID: number;
    style_ID: number;
    stock: number;
    createdBy: string;

    constructor(){
        this.id = 0;
        this.name = '';
        this.description = '';
        this.size_ID = 0;
        this.style_ID = 0;
        this.stock = 0;
        this.createdBy = '';
    }
}