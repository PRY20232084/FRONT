export class RawMaterial{
    id: number;
    name: string;
    description: string;
    brandName: string;
    color: string;
    stock: number;
    measurementUnit_ID: number;
    createdBy: string;
    measurementUnitName: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.brandName = '';
        this.color = '';
        this.stock = 0;
        this.measurementUnit_ID = 0;
        this.createdBy = '';
        this.measurementUnitName = '';
    }
}