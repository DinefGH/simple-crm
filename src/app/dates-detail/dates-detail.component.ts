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

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      const id = this.datesId = paramMap.get('id')!;
      console.log('GOT Dates ID', this.datesId);
      this.getDates();
  })
  }


  getDates() {
    this.firestore
    .collection('dates')
    .doc(this.datesId)
    .valueChanges()
    .subscribe(( datesParam: any) => {
      this.dates = new Dates(datesParam);
      console.log('Retrieved dates', this.dates);
    });
  }


  deleteDatesDetail() {
    this.firestore
    .collection('dates')
    .doc(this.datesId)
    .delete()
    .then(() => {
        console.log('Dates successfully deleted!');
    })
    .catch((error) => {
        console.error('Error removing dates: ', error);
    });
}
 

  editDatesDetail() {
    const dialog = this.dialog.open(DialogEditDatesComponent);
    dialog.componentInstance.dates = new Dates(this.dates.toJSON());
    dialog.componentInstance.datesId = this.datesId;
  }
}