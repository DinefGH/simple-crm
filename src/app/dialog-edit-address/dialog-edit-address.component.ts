import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: AngularFirestore) { }
  loading = false;
user!: User;
userId:  string | undefined = '';

saveEditAddress(){
  this.loading = true;
  this.firestore
  .collection('users')
  .doc(this.userId)
  .update(this.user.toJSON())
  .then(() => {
    this.loading = false;
    this.dialogRef.close();
  })
  .catch((error) => {
    this.loading = false;
    console.error('Error updating user:', error);
    // Handle the error if needed
  });
}
}