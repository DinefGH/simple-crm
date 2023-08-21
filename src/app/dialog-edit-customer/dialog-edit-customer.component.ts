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

saveEditCustomer(){
    this.loading = true;
  this.firestore
  .collection('customers')
  .doc(this.customerId)
  .update(this.customer.toJSON())
  .then(() => {
  this.loading = false;
  this.dialogRef.close();
});
}
}
