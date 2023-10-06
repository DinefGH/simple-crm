import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Dates } from 'src/models/dates.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogEditDatesComponent } from '../dialog-edit-dates/dialog-edit-dates.component';

@Component({
  selector: 'app-dates-detail',
  templateUrl: './dates-detail.component.html',
  styleUrls: ['./dates-detail.component.scss']
})
export class DatesDetailComponent implements OnInit{

  datesId:  string | undefined = '';
  dates: Dates = new Dates();


  constructor (public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore ) {}


  /**
 * Angular's ngOnInit lifecycle method to initialize the component.
 *
 * Listens for changes to the route parameters, specifically looking for an 'id' parameter.
 * Once the 'id' is retrieved, it stores that ID and fetches the corresponding dates data.
 *
 * @returns {void}
 */
  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      const id = this.datesId = paramMap.get('id')!;
      this.getDates();
  })
  }



  /**
 * Fetches a specific dates document from Firestore based on the dates ID.
 *
 * Subscribes to value changes on the Firestore document and updates the component's dates property.
 *
 * @returns {Subscription} A subscription to the Firestore document.
 */
  getDates() {
    this.firestore
    .collection('dates')
    .doc(this.datesId)
    .valueChanges()
    .subscribe(( datesParam: any) => {
      this.dates = new Dates(datesParam);
    });
  }


  /**
 * Deletes a specific dates document from Firestore.
 *
 * Removes the Firestore document corresponding to the stored dates ID.
 * Logs success or error messages to the console.
 *
 * @returns {Promise<void>} A promise that resolves when the delete operation is complete.
 */
  deleteDatesDetail() {
    this.firestore
    .collection('dates')
    .doc(this.datesId)
    .delete()
    .then(() => {
    })
    .catch((error) => {
        console.error('Error removing dates: ', error);
    });
}
 

/**
 * Opens a dialog to edit details of the dates.
 *
 * Creates a new instance of DialogEditDatesComponent and passes the current dates data and ID to it.
 *
 * @returns {void}
 */
  editDatesDetail() {
    const dialog = this.dialog.open(DialogEditDatesComponent);
    dialog.componentInstance.dates = new Dates(this.dates.toJSON());
    dialog.componentInstance.datesId = this.datesId;
  }
}