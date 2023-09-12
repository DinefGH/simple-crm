import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent {
  constructor(public dialogRef: MatDialogRef<DialogAddCustomerComponent>, private firestore: AngularFirestore) { }
  customer = new Customer();
  loading = false;


  /**
 * Saves a customer object to a Firestore database collection.
 *
 */
saveCustomer() {
  this.loading = true;
  this.firestore
    .collection('customers')
    .add(this.customer.toJSON())
    .then((result: any) => {
      this.loading = false;
      this.dialogRef.close();
    });
}

}
