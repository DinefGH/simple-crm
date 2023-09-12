import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/models/tasks.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {FormControl,} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-edit-tasks',
  templateUrl: './dialog-edit-tasks.component.html',
  styleUrls: ['./dialog-edit-tasks.component.scss']
})

  export class DialogEditTasksComponent implements OnInit{
    constructor(public dialogRef: MatDialogRef<DialogEditTasksComponent>, private firestore: AngularFirestore) { }
    loading = false;
  tasks!: Tasks;
  tasksId:  string | undefined = '';
  dueDate!: Date;
  myControl = new FormControl('');
  options: string[] = ['Video', 'Backoffice', 'Customer', 'Sales', 'Designs', 'Marketing'];
  filteredOptions!: Observable<string[]>;
  areOptionsFiltered = false;
  

/**
 * Component initialization lifecycle hook.
 * Sets up the filtered options for the control based on value changes.
 */
ngOnInit() {
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const filteredValues = this._filter(value || '');
      this.areOptionsFiltered = filteredValues.length !== this.options.length;
      return filteredValues;
    })
  );
}

/**
 * Filters the options based on the provided value.
 * 
 * @param {string} value - The value to filter the options by.
 * @returns {string[]} The filtered list of options.
 */
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}

/**
 * Saves the edited task details to Firestore.
 * Updates the task document with the provided task ID.
 * Closes the dialog once the update is successful.
 */
saveEditTasks() {
  this.loading = true;
  this.firestore
    .collection('tasks')
    .doc(this.tasksId)
    .update(this.tasks.toJSON())
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
}

  }
  
