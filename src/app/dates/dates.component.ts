import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dates } from 'src/models/dates.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { DialogAddDatesComponent } from '../dialog-add-dates/dialog-add-dates.component';
import { ActivatedRoute } from '@angular/router';
import { DialogEditDatesComponent } from '../dialog-edit-dates/dialog-edit-dates.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {

  sortField: string | null = null; // This tracks which field we're sorting by (e.g., 'title', 'priority')
  sortOrder: 'asc' | 'desc' = 'asc'; // This tracks the sort direction
  dates: Dates = new Dates();
  allDates: Dates[] = [];
  customIdDates: Dates[] = [];
  currentDate: any;
  searchTerm: string = '';
  datesId: string | undefined = '';


  constructor(private datePipe: DatePipe, private router: Router, public dialog: MatDialog, private firestore: AngularFirestore, private route: ActivatedRoute,) { }

  /**
 * Initializes the component and subscribes to value changes in the 'dates' collection.
 * Populates the `allDates` array with the changes received.
 */
  ngOnInit(): void {
    this.firestore
      .collection('dates')
      .valueChanges({ idField: 'customIdDates' })
      .subscribe((changes: any) => {
        this.allDates = changes;
      });
  }


  /**
 * Getter function to filter dates based on the `searchTerm`.
 * @returns {any[]} Filtered dates if `searchTerm` is present, otherwise returns all dates.
 */
  get filteredDates(): any[] {
    if (!this.searchTerm) return this.allDates;
    return this.allDates.filter(dates =>
      (dates.dateName).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  /**
   * Opens the add-dates dialog.
   */
  openDialog() {
    this.dialog.open(DialogAddDatesComponent);
  }


  /**
 * Handles clicks on table headers for sorting.
 * @param {string} field - The field by which the table should be sorted.
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
 * Applies sorting to `allDates` based on `sortField` and `sortOrder`.
 */
  applySorting(): void {
    const sortField = this.sortField; // assign to a local variable
    if (sortField) {
      this.allDates.sort((a, b) => {
        const aValue = (a as any)[sortField];
        const bValue = (b as any)[sortField];
        if (!aValue || !bValue) return 0;
        const comparison = aValue.toString().localeCompare(bValue.toString());
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
    }
  }
}