import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }
  user = new User();
  birthDate!: Date;
  loading = false;

  /**
 * Saves a user to a Firestore collection.
 *
 * This function converts the user's birthDate to a timestamp, sets the loading state to true,
 * and then attempts to add the user object to a Firestore collection. Upon successful addition,
 * the loading state is reset to false and the dialog is closed.
 */
saveUser() {
  this.user.birthDate = this.birthDate.getTime();
  this.loading = true;
  this.firestore
    .collection('users')
    .add(this.user.toJSON())
    .then((result: any) => {
      this.loading = false;
      console.log('Adding user finished', result);
      this.dialogRef.close();
    });
}

}
