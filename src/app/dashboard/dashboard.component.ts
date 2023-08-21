import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { Tasks } from 'src/models/tasks.class';
import { Customer } from 'src/models/customer.class';
import { getWeek, format } from 'date-fns';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  tasksList: Tasks[] = [];
  greetMessage: string = '';
  user: User = new User();
  allUsers: User[] = [];
  customIdName: User[] = [];
  currentDate: any;
  tasks : Tasks = new Tasks()
allTasks: Tasks[] = [];
customIdTitle: Tasks[] = [];
customer: Customer = new Customer();
  allCustomer: Customer[] = [];
  customIdCustomerName: Customer[] = [];


private daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
private date = new Date();
public hour: any;
public minute!: string;
public second!: string;
public day!: string;

public currentDateString!: string;
public calenderweek!: number;



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
    this.tasksList = this.allTasks;
  });

  this.firestore
  .collection('customers')
  .valueChanges({idField: 'customIdCustomerName'})
  .subscribe(( changes: any) => {
    console.log('Received Customer changes from DB', changes)
    this.allCustomer = changes;
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
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

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
  }

  getUrgentTaskCount(): number {
    return this.tasksList.filter(task => task.priority === 'Urgent').length;
}


getDoneTaskCount(): number {
  return this.tasksList.filter(task => task.status === 'done').length;
}


getProgressPercentage(): number {
  let doneTasks = this.getDoneTaskCount();
  let totalTasks = this.allTasks.length;

  // Ensure you're not dividing by zero
  if(totalTasks === 0) return 0;

  return (doneTasks / totalTasks) * 100;
}
}

