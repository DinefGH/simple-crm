import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  public someProperty!: string;
  userId:  string | undefined = '';
  user: User = new User();


  constructor (public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore,  private cdRef: ChangeDetectorRef) {}

  /**
 * Initializes the component.
 * Subscribes to route parameters to retrieve the user ID.
 */
ngOnInit() {
  this.route.paramMap.subscribe(paramMap => {
    const id = this.userId = paramMap.get('id')!;
    this.getUser();
  });
  this.someProperty = this.getRandomColor();
  this.cdRef.detectChanges();
}

/**
 * Fetches user details from Firestore based on the user ID.
 */
getUser() {
  this.firestore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe((userParam: any) => {
      this.user = new User(userParam);
      console.log('Retrieved user', this.user);
    });
}

/**
 * Deletes the user details from Firestore based on the user ID.
 */
deleteUserDetail() {
  this.firestore
    .collection('users')
    .doc(this.userId)
    .delete()
    .then(() => {
      console.log('User successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing user: ', error);
    });
}

/**
 * Opens a dialog to edit user details.
 */
editUserDetail() {
  const dialog = this.dialog.open(DialogEditUserComponent);
  dialog.componentInstance.user = new User(this.user.toJSON());
  dialog.componentInstance.userId = this.userId;
}

getRandomColor(): string {
  let color: string;
  let r: number;
  let g: number;
  let b: number;

  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    color = `rgb(${r},${g},${b})`;
  } while (this.isTooDark(r, g, b));

  return color;
}

isTooDark(r: number, g: number, b: number): boolean {
  const threshold = 254; 
  return r <= threshold && g <= threshold && b <= threshold;
}

}
