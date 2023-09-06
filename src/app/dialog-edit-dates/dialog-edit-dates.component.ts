import { Component } from '@angular/core';
import { Dates } from 'src/models/dates.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-dialog-edit-dates',
  templateUrl: './dialog-edit-dates.component.html',
  styleUrls: ['./dialog-edit-dates.component.scss']
})
export class DialogEditDatesComponent {


  constructor(public dialogRef: MatDialogRef<DialogEditDatesComponent>, private firestore: AngularFirestore) { }
  loading = false;
  dates!: Dates;
  datesId:  string | undefined = '';
  datesDate!: Date;

saveEditDates(){
    this.loading = true;
  this.firestore
  .collection('usdatesers')
  .doc(this.datesId)
  .update(this.dates.toJSON())
  .then(() => {
  this.loading = false;
  this.dialogRef.close();
});
}
}
