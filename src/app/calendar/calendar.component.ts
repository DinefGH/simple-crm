import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Dates } from 'src/models/dates.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogEditDatesComponent } from '../dialog-edit-dates/dialog-edit-dates.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent {

  dates: Dates = new Dates();
  allDates: Dates[] = [];


  constructor( public dialog: MatDialog, private firestore: AngularFirestore, private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.firestore
    .collection('dates')
    .valueChanges({idField: 'customIdDates'})
    .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        this.allDates = changes.map((change: any) => new Dates(change));

        // Convert Dates objects to calendar events and update the calendarOptions
        this.calendarOptions.events = this.allDates.map(dates => dates.toCalendarEvent());
    });
}

  title = 'simple-crm';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    displayEventTime: false,
    ...{ dateClick: this.handleDateClick.bind(this) } as any
};

  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }

  toCalendarEvent() {
    return {
        title: this.dates.dateName,
        date: new Date(this.dates.datesDate).toISOString().split('T')[0]  // You might need to format this date to 'YYYY-MM-DD' format
    };
}
}



