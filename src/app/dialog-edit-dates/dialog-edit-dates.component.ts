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
  timeValue!: string;

/**
 * Saves the edited date details to Firestore.
 * Updates the date document in the 'usdatesers' collection with the provided dates ID.
 * Closes the dialog once the update is successful.
 */
saveEditDates() {
  this.dates.datesDate = this.datesDate.getTime();
  this.dates.timeValue = this.timeValue; 
  this.loading = true;
  this.firestore
    .collection('dates')
    .doc(this.datesId)
    .update(this.dates.toJSON())
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
}
}
