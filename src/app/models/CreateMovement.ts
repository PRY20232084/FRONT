export class CreateMovement{
    description: string;
    boughtDate: Date;
    movementType: boolean;
    registerType: boolean;
    createdBy: string

    constructor(){
        this.description = '';
        this.boughtDate = new Date();
        this.movementType = true;
        this.registerType = true;
        this.createdBy = '';
    }
}