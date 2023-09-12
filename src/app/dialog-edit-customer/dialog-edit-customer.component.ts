import { Component } from '@angular/core';
import { Customer } from 'src/models/customer.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';




@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent {
  constructor(public dialogRef: MatDialogRef<DialogEditCustomerComponent>, private firestore: AngularFirestore) { }
  loading = false;
customer!: Customer;
customerId:  string | undefined = '';
birthDate!: Date;

/**
 * Saves the new customer details to Firestore.
 * Adds a new customer document to the 'customers' collection.
 * Closes the dialog once the addition is successful and logs the result.
 */
saveEditCustomer() {
  this.loading = true;
  this.firestore
    .collection('customers')
    .add(this.customer.toJSON())
    .then((result: any) => {
      this.loading = false;
      console.log('Adding customer finished', result);
      this.dialogRef.close();
    });
}
}
