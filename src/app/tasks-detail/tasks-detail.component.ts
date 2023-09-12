import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Tasks } from 'src/models/tasks.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogEditTasksComponent } from '../dialog-edit-tasks/dialog-edit-tasks.component';

@Component({
  selector: 'app-tasks-detail',
  templateUrl: './tasks-detail.component.html',
  styleUrls: ['./tasks-detail.component.scss']
})


  export class TasksDetailComponent implements OnInit{

    tasksId:  string | undefined = '';
    tasks: Tasks = new Tasks();
  
  
    constructor (public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore ) {}
  

/**
 * Initializes the component.
 * Subscribes to route parameters to retrieve the task ID.
 */
ngOnInit() {
  this.route.paramMap.subscribe(paramMap => {
    const id = this.tasksId = paramMap.get('id')!;
    console.log('GOT Tasks ID', this.tasksId);
    this.getTasks();
  });
}

/**
 * Fetches task details from Firestore based on the task ID.
 */
getTasks() {
  this.firestore
    .collection('tasks')
    .doc(this.tasksId)
    .valueChanges()
    .subscribe((tasksParam: any) => {
      this.tasks = new Tasks(tasksParam);
      console.log('Retrieved tasks', this.tasks);
    });
}

/**
 * Deletes the task details from Firestore based on the task ID.
 */
deleteTaskDetail() {
  this.firestore
    .collection('tasks')
    .doc(this.tasksId)
    .delete()
    .then(() => {
      console.log('Task successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing task: ', error);
    });
}

/**
 * Opens a dialog to edit task details.
 */
editTasksDetail() {
  const dialog = this.dialog.open(DialogEditTasksComponent);
  dialog.componentInstance.tasks = new Tasks(this.tasks.toJSON());
  dialog.componentInstance.tasksId = this.tasksId;
}

/**
 * Determines the background color based on the task category.
 * @param {string} category - The category of the task.
 * @returns {string} The color associated with the category.
 */
getBackgroundColorCategory(category: string): string {
  switch (category) {
    case 'Designs': return 'blue';
    case 'Video': return 'red';
    case 'Customer': return 'green';
    case 'Sales': return 'yellow';
    case 'Marketing': return 'orange';
    case 'Backoffice': return 'purple';
    default: return 'white'; 
  }
}

/**
 * Determines the background color based on the task priority.
 * @param {string} priority - The priority of the task.
 * @returns {string} The color associated with the priority.
 */
getBackgroundColorPriority(priority: string): string {
  switch (priority) {
    case 'Urgent': return 'rgb(255, 61, 0)';
    case 'Medium': return 'rgb(255, 168, 0)';
    case 'Low': return 'rgb(122, 226, 41)';
    default: return 'white'; 
  }
}

/**
 * Determines the background color based on the task status.
 * @param {string} status - The status of the task.
 * @returns {string} The color associated with the status.
 */
getBackgroundColorStatus(status: string): string {
  switch (status) {
    case 'open': return 'red';
    case 'done': return 'blue';
    default: return 'white'; 
  }
}
  }