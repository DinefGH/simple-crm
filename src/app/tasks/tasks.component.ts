import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTasksComponent } from '../dialog-add-tasks/dialog-add-tasks.component';
import { Tasks } from 'src/models/tasks.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{


tasks : Tasks = new Tasks()
allTasks: Tasks[] = [];
customIdTitle: Tasks[] = [];


constructor(private datePipe: DatePipe, public dialog: MatDialog, private firestore: AngularFirestore) { }
ngOnInit(): void {
  this.firestore
  .collection('tasks')
  .valueChanges({idField: 'customIdTitle'})
  .subscribe(( changes: any) => {
    console.log('Received Tasks changes from DB', changes)
    this.allTasks = changes;
  });

}
openDialog() {
  this.dialog.open(DialogAddTasksComponent);
}
}
