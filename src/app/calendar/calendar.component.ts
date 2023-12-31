import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Dates } from 'src/models/dates.class';
import { Tasks } from 'src/models/tasks.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogEditDatesComponent } from '../dialog-edit-dates/dialog-edit-dates.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent {

  dates: Dates = new Dates();
  allDates: Dates[] = [];
  tasks = new Tasks();
  allTasks: Tasks[] = [];

  constructor( public dialog: MatDialog, private firestore: AngularFirestore, private route: ActivatedRoute,) { }
  
  
  /**
 * Initializes the component and fetches dates and tasks from Firestore.
 * Converts the fetched Dates and Tasks into calendar events and updates the calendarOptions.
 */
  ngOnInit(): void {
    const dates$ = this.firestore.collection('dates').valueChanges({ idField: 'customIdDates' });
    const tasks$ = this.firestore.collection('tasks').valueChanges({ idField: 'customIdTasks' });
  
    combineLatest([dates$, tasks$]).subscribe(([datesData, tasksData]) => {
  
      this.allDates = datesData.map((date: any) => new Dates(date));
      this.allTasks = tasksData.map((task: any) => new Tasks(task));
  
      // Convert Dates and Tasks objects to calendar events and update the calendarOptions
      const dateEvents = this.allDates.map(date => {
        const dateDate = new Date(date.datesDate);
        const localDate = new Date(dateDate.getTime() - (dateDate.getTimezoneOffset() * 60000));
        const dateStr = localDate.toISOString().split('T')[0];
        return {
          title: date.dateName,
          date: dateStr
        };
      });
  
      const taskEvents = this.allTasks.map(task => {
        const taskDate = new Date(task.dueDate);
        const localDate = new Date(taskDate.getTime() - (taskDate.getTimezoneOffset() * 60000));
        const dateStr = localDate.toISOString().split('T')[0];
        return {
          title: task.title,
          date: dateStr,
          backgroundColor: '#ff3d00',
        };
      });
  
      this.calendarOptions.events = [...dateEvents, ...taskEvents];
    });
  }


/** 
 * Application title.
 * @type {string}
 */
  title = 'simple-crm';


  /**
 * Configuration object for the calendar view.
 * @type {CalendarOptions}
 */
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    displayEventTime: false,
};



  /**
 * Converts Dates and Tasks into calendar events.
 * @returns {Array} An array of calendar events.
 */
  toCalendarEvent() {
    return [
        {
            title: this.dates.dateName,
            date: new Date(this.dates.datesDate).toISOString().split('T')[0]
        },
        {
            title: this.tasks.title,
            date: new Date(this.tasks.dueDate).toISOString().split('T')[0]
        }
    ];
}
}



