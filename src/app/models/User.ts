export class User {
    ID: string;
    Name: string;
    Email: string;
    Phone: string;
    Password: string;
    UserType: boolean;
    Enterprise: string;

    constructor() {
        this.ID = '';
        this.Name = '';
        this.Email = '';
        this.Phone = '';
        this.Password = '';
        this.UserType = false;
        this.Enterprise = '';
    }
}