import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore) { }
  loading = false;
user!: User;
userId:  string | undefined = '';
birthDate!: Date;

saveEditUser(){
    this.loading = true;
  this.firestore
  .collection('users')
  .doc(this.userId)
  .update(this.user.toJSON())
  .then(() => {
  this.loading = false;
  this.dialogRef.close();
});
}
}
