export class createRawMaterial{
    name: string;
    description: string;
    brandName: string;
    color: string;
    stock: number;
    measurementUnit_ID: number;
    createdBy: string;

    constructor() {
        this.name = '';
        this.description = '';
        this.brandName = '';
        this.color = '';
        this.stock = 0;
        this.measurementUnit_ID = 0;
        this.createdBy = '';
    }
}