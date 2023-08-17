import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { Tasks } from 'src/models/tasks.class';
import { getWeek, format } from 'date-fns';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  greetMessage: string = '';
  user: User = new User();
  allUsers: User[] = [];
  customIdName: User[] = [];
  currentDate: any;
  tasks : Tasks = new Tasks()
allTasks: Tasks[] = [];
customIdTitle: Tasks[] = [];

private daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
private date = new Date();
public hour: any;
public minute!: string;
public second!: string;
public day!: string;

public currentDateString!: string;
public calenderweek!: number;


public barChartLegend = true;
public barChartPlugins = [];

public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  datasets: [
    { data: [ 0.2, 0.5, 0.7, 0.1, 0.8, 0.4, 1.0, 0.8, 0.8, 0.2, 0.6, 0.7 ], label: '2021', backgroundColor: [ 'rgb(1, 209, 255)' ] },
    { data: [ 0.4, 0.8, 0.2, 0.6, 0.4, 1.0, 0.8, 0.2, 0.6, 0.4, 0.2, 0.8 ], label: '2022', backgroundColor: [ 'rgb(229, 200, 82)' ]  }
  ]
};

public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 0.2,
        // Use a callback function to format the tick labels
        callback: function(value) {
          return '$' + value + 'M';
        }
      }
    }
  }
};

  constructor(private datePipe: DatePipe, public dialog: MatDialog, private firestore: AngularFirestore) { }
  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe(( changes: any) => {
      console.log('Received changes from DB', changes)
      this.allUsers = changes;
    });

    this.firestore
  .collection('tasks')
  .valueChanges({idField: 'customIdTitle'})
  .subscribe(( changes: any) => {
    console.log('Received Tasks changes from DB', changes)
    this.allTasks = changes;
  });

  setInterval (() => {
    const date = new Date();
    this.updateDate(date);
  }, 1000);


  this.day = this.daysArray[this.date.getDay()];

  this.updateDateInfo();


  this.setGreetingMessage();
  }

  private updateDate(date: Date) {
    const hours = date.getHours();
    this.hour = hours < 10 ? '0' + hours : hours.toString();

    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' +minutes : minutes.toString();

    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }


  private updateDateInfo(): void {
    const now = new Date();
    this.currentDateString = format(now, 'dd.MM.yyyy'); // Display date in "dd.mm.yyyy" format
    this.calenderweek = getWeek(now);
  }


  setGreetingMessage() {
    let hour = new Date().getHours();

    if (hour >= 0 && hour < 12) {
      this.greetMessage = "Good morning, ";
    } else if (hour >= 12 && hour < 17) {
      this.greetMessage = "Good afternoon, ";
    } else if (hour >= 17 && hour < 24) {
      this.greetMessage = "Good evening, ";
    }
    // ... your other conditions ...
  }
}

