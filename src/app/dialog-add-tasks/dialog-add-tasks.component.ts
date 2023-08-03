import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/models/tasks.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {FormControl,} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-add-tasks',
  templateUrl: './dialog-add-tasks.component.html',
  styleUrls: ['./dialog-add-tasks.component.scss']
})
export class DialogAddTasksComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<DialogAddTasksComponent>, private firestore: AngularFirestore) { }


  tasks = new Tasks();
  loading = false;
  dueDate!: Date;
  myControl = new FormControl('');
  options: string[] = ['Video', 'Backoffice', 'Customer', 'Sales', 'Designs', 'Marketing'];
  filteredOptions!: Observable<string[]>;
  areOptionsFiltered = false;
  


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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  saveTasks() {
    this.tasks.dueDate = this.dueDate.getTime();
    this.myControl = new FormControl(this.tasks.category || '');
    this.loading = true;
    this.firestore
    .collection('tasks')
    .add(this.tasks.toJSON())
    .then((result: any) => {
      this.loading = false;
      console.log('Adding tasks finished', result);
      this.dialogRef.close();
    });
  }
}


