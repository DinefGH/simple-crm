export class User {
    firstName: string;
    customIdName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;

    constructor (obj?: any) {
        this.firstName = obj ? obj.firstName: '';
        this.customIdName = obj ? obj.customIdName : '';
        this.lastName = obj ? obj.lastName: '';
        this.email = obj ? obj.email: '';
        this.birthDate = obj ? obj.birthDate: '';
        this.street = obj ? obj.street: '';
        this.zipCode = obj ? obj.zipCode: '';
        this.city = obj ? obj.city: '';
    }

    public toJSON() {
        return {
    firstName: this.firstName,
    customIdName: this.customIdName,
    email: this.email,
    lastName: this.lastName,
    birthDate: this.birthDate,
    street: this.street,
    zipCode: this.zipCode,
    city: this.city,
        };
    }
}