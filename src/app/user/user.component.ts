import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  sortField: string | null = null; // This tracks which field we're sorting by (e.g., 'title', 'priority')
  sortOrder: 'asc' | 'desc' = 'asc'; // This tracks the sort direction
  user: User = new User();
  allUsers: User[] = [];
  customIdName: User[] = [];
  currentDate: any;
  searchTerm: string = '';
  


  constructor(private datePipe: DatePipe, public dialog: MatDialog, private firestore: AngularFirestore) { }
  /**
 * Initializes the component.
 * Fetches all users from Firestore.
 */
ngOnInit(): void {
  this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      console.log('Received changes from DB', changes);
      this.allUsers = changes;
    });
}

/**
 * Filters users based on the search term.
 * If no search term is provided, returns all users.
 * @returns {any[]} The filtered list of users.
 */
get filteredUsers(): any[] {
  if (!this.searchTerm) return this.allUsers;
  return this.allUsers.filter(user => 
    (user.firstName + ' ' + user.lastName).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    user.phoneNumber.toString().includes(this.searchTerm)  
  );
}

/**
 * Opens the dialog to add a new user.
 */
openDialog() {
  this.dialog.open(DialogAddUserComponent);
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
 * Applies sorting to the list of users based on the sort field and order.
 */
applySorting(): void {
  const sortField = this.sortField; // assign to a local variable

  if (sortField) {
    this.allUsers.sort((a, b) => {
      const aValue = (a as any)[sortField];
      const bValue = (b as any)[sortField];

      if (!aValue || !bValue) return 0;

      const comparison = aValue.toString().localeCompare(bValue.toString());

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

}
}