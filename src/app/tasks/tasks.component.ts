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

  sortField: string | null = null; 
  sortOrder: 'asc' | 'desc' = 'asc'; 
tasks : Tasks = new Tasks()
allTasks: Tasks[] = [];
customIdTitle: Tasks[] = [];
currentDate: any;
searchTerm: string = '';


constructor(private datePipe: DatePipe, public dialog: MatDialog, private firestore: AngularFirestore) { }
/**
 * Initializes the component.
 * Fetches all tasks from Firestore.
 */
ngOnInit(): void {
  this.firestore
    .collection('tasks')
    .valueChanges({idField: 'customIdTitle'})
    .subscribe((changes: any) => {
      console.log('Received Tasks changes from DB', changes);
      this.allTasks = changes;
    });
}

/**
 * Filters tasks based on the search term.
 * If no search term is provided, returns all tasks.
 * @returns {any[]} The filtered list of tasks.
 */
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

/**
 * Opens the dialog to add a new task.
 */
openDialog() {
  this.dialog.open(DialogAddTasksComponent);
}

/**
 * Handles header click events for sorting.
 * Toggles the sort order if the field is already being sorted.
 * Otherwise, sets the sort field and defaults to ascending order.
 * @param {string} field - The field to sort by.
 */
onHeaderClick(field: string): void {
  if (this.sortField === field) {
    // If already sorting by this field, toggle the sort order
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortField = field;
    this.sortOrder = 'asc';
  }
  this.applySorting();
}

/**
 * Applies sorting to the list of tasks based on the sort field and order.
 */
applySorting(): void {
  const sortField = this.sortField; // assign to a local variable

  if (sortField) {
    this.allTasks.sort((a, b) => {
      const aValue = (a as any)[sortField];
      const bValue = (b as any)[sortField];

      if (!aValue || !bValue) return 0;

      const comparison = aValue.toString().localeCompare(bValue.toString());

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}

}
