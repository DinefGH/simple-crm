import { Component } from '@angular/core';
import { Dates } from 'src/models/dates.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-dates',
  templateUrl: './dialog-add-dates.component.html',
  styleUrls: ['./dialog-add-dates.component.scss']
})
export class DialogAddDatesComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddDatesComponent>, private firestore: AngularFirestore) { }
  dates = new Dates();
  datesDate!: Date;
  loading = false;
  timeValue!: string;

  /**
 * Saves a dates object to a Firestore database collection.
 *
 */
saveDates() {
  this.dates.datesDate = this.datesDate.getTime();
  this.dates.timeValue = this.timeValue; 
  this.loading = true;
  this.firestore
    .collection('dates')
    .add(this.dates.toJSON())
    .then((result: any) => {
      this.loading = false;
      console.log('Adding dates finished', result);
      this.dialogRef.close();
    });
}
}
