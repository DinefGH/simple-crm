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
currentDate: any;
searchTerm: string = '';


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


get filteredTasks(): any[] {
  if (!this.searchTerm) return this.allTasks;
  return this.allTasks.filter(tasks => {
    const dueDateString = this.datePipe.transform(tasks.dueDate, 'dd-MM-yyyy');
    return tasks.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tasks.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tasks.descreption.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (dueDateString && dueDateString.includes(this.searchTerm)) ||
      tasks.priority.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tasks.subtasks.toString().includes(this.searchTerm);
  });
}

openDialog() {
  this.dialog.open(DialogAddTasksComponent);
}
}
