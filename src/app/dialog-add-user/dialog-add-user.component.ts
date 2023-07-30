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

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user)
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
