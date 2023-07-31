import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  userId:  string | undefined = '';
  user: User = new User();


  constructor (public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore ) {}

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      const id = this.userId = paramMap.get('id')!;
      console.log('GOT ID', this.userId);
      this.getUser();
  })
  }


  getUser() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe(( userParam: any) => {
      this.user = new User(userParam);
      console.log('Retrieved user', this.user);
    });
  }



 

  editUserAddress(){
   const dialog = this.dialog.open(DialogEditAddressComponent);
   dialog.componentInstance.user = new User(this.user.toJSON());
   dialog.componentInstance.userId = this.userId;
  }
  

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
