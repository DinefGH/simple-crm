export class Customer {
    customerName: string;
    customIdCustomerName: string;
    email: string;
    contact: string;
    website: string;
    phoneNumber: number;
    street: string;
    zipCode: number;
    city: string;
    country: string;
    about: string;
    invoiced: number;

    constructor (obj?: any) {
        this.customerName = obj ? obj.customerName: '';
        this.customIdCustomerName = obj ? obj.customIdCustomerName : '';
        this.email = obj ? obj.email: '';
        this.contact = obj ? obj.contact: '';
        this.website = obj ? obj.website: '';
        this.phoneNumber = obj ? obj.phoneNumber: '';
        this.street = obj ? obj.street: '';
        this.zipCode = obj ? obj.zipCode: '';
        this.city = obj ? obj.city: '';
        this.country = obj ? obj.country: '';
        this.about = obj ? obj.about: '';
        this.invoiced = obj ? obj.invoiced: '';
    }

    public toJSON() {
        const customerJson: any = {
    customerName: this.customerName,
    customIdCustomerName: this.customIdCustomerName,
    email: this.email,
    contact: this.contact,
    website: this.website,
    phoneNumber: this.phoneNumber,
    street: this.street,
    zipCode: this.zipCode,
    city: this.city,
    country: this.country,
    about: this.about,
    invoiced: this.invoiced,

    
        };


        for (const key in customerJson) {
            if (customerJson.hasOwnProperty(key) && customerJson[key] === undefined) {
              delete customerJson[key];
            }
          }
      
          return customerJson;
    }
}