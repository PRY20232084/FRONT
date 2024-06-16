export class Movement {
    id: number;
    description: string;
    createdAt: Date;
    boughtDate: Date;
    createdBy: string;
    movementType: boolean;
    registerType: boolean;

    constructor() {
        this.id = 0;
        this.description = '';
        this.createdAt = new Date();
        this.boughtDate = new Date();
        this.createdBy = '';
        this.movementType = false;
        this.registerType = false;
    }
}