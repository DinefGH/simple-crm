import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  userId:  string | undefined = '';
  user: User = new User();


  constructor (public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore ) {}

  /**
 * Initializes the component.
 * Subscribes to route parameters to retrieve the user ID.
 */
ngOnInit() {
  this.route.paramMap.subscribe(paramMap => {
    const id = this.userId = paramMap.get('id')!;
    console.log('GOT User ID', this.userId);
    this.getUser();
  });
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

/**
 * Generates a random RGB color that is not too bright.
 * @returns {string} The generated RGB color string.
 */
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
  } while (this.isTooBright(r, g, b));

  return color;
}

/**
 * Checks if the provided RGB color is too bright.
 * @param {number} r - The red component of the color.
 * @param {number} g - The green component of the color.
 * @param {number} b - The blue component of the color.
 * @returns {boolean} True if the color is too bright, false otherwise.
 */
isTooBright(r: number, g: number, b: number): boolean {
  const threshold = 100; 
  return r > threshold || g > threshold || b > threshold;
}
}