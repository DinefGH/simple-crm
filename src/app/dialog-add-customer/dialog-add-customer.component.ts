import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {FormControl,} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent {
  constructor(public dialogRef: MatDialogRef<DialogAddCustomerComponent>, private firestore: AngularFirestore) {
    this.firestore.collection('users').valueChanges({ idField: 'customIdName' })
    .subscribe((changes: any) => {
      this.filteredUsers = changes;
    });

   }
  customer = new Customer();
  loading = false;
  filteredUsers: any[] = [];
  allUsers: User[] = [];
  selectedUser!: User;

  get fullName(): string {
    return `${this.selectedUser?.firstName} ${this.selectedUser?.lastName}`;
}

  saveCustomer() {
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
