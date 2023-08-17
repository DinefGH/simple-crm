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
  
    ngOnInit() {
      this.route.paramMap.subscribe( paramMap => {
        const id = this.tasksId = paramMap.get('id')!;
        console.log('GOT Tasks ID', this.tasksId);
        this.getTasks();
    })
    }
  
  
    getTasks() {
      this.firestore
      .collection('tasks')
      .doc(this.tasksId)
      .valueChanges()
      .subscribe(( tasksParam: any) => {
        this.tasks = new Tasks(tasksParam);
        console.log('Retrieved tasks', this.tasks);
      });
    }
  
  
  
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
   
  
    editTasksDetail() {
      const dialog = this.dialog.open(DialogEditTasksComponent);
      dialog.componentInstance.tasks = new Tasks(this.tasks.toJSON());
      dialog.componentInstance.tasksId = this.tasksId;
    }


    getBackgroundColorCategory(category: string): string {
      switch (category) {
        case 'Designs': return 'blue';
        case 'Video': return 'red';
        case 'Customer': return 'green';
        case 'Sales': return 'yellow';
        case 'Marketing': return 'orange';
        case 'Backoffice': return 'purple';
        default: return 'white';  // default color for unrecognized categories
      }
    }


    

    getBackgroundColorPriority(priority: string): string {
      switch (priority) {
        case 'Urgent': return 'rgb(255, 61, 0)';
        case 'Medium': return 'rgb(255, 168, 0)';
        case 'Low': return 'rgb(122, 226, 41)';
        // ... and so on for the rest of your categories
        default: return 'white';  // default color for unrecognized categories
  }
  }

  getBackgroundColorStatus(status: string): string {
    switch (status) {
      case 'open': return 'red';
      case 'done': return 'blue';
      default: return 'white';  // default color for unrecognized categories
}
}
}
  
