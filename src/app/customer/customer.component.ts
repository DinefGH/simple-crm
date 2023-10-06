import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { Customer } from 'src/models/customer.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{

  sortField: string | null = null; // This tracks which field we're sorting by (e.g., 'title', 'priority')
  sortOrder: 'asc' | 'desc' = 'asc'; // This tracks the sort direction
  customer: Customer = new Customer();
  allCustomer: Customer[] = [];
  customIdCustomerName: Customer[] = [];
  currentDate: any;
  searchTerm: string = '';

  


  constructor(private datePipe: DatePipe, public dialog: MatDialog, private firestore: AngularFirestore) { }
  

  /**
 * Angular lifecycle hook that gets executed when the component is initialized.
 * Fetches the list of customers from Firestore and updates the allCustomer array.
 */
  ngOnInit(): void {
    this.firestore
    .collection('customers')
    .valueChanges({idField: 'customIdCustomerName'})
    .subscribe(( changes: any) => {
      this.allCustomer = changes;
    });
  }


  /**
 * Filters the list of all customers based on the search term.
 * @returns {any[]} - Returns the filtered array of customers.
 */
  get filteredCustomer(): any[] {
    if (!this.searchTerm) return this.allCustomer;
    return this.allCustomer.filter(customer => 
      customer.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.website.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.phoneNumber.toString().includes(this.searchTerm)  
    );
}


/**
 * Opens a dialog for adding a new customer.
 */
  openDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }


  /**
 * Sorts the customers based on the clicked table header.
 * @param {string} field - The name of the table header clicked.
 */
  onHeaderClick(field: string): void {
    if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        this.sortField = field;
        this.sortOrder = 'asc';
    }
    this.applySorting();
  }
  

  /**
 * Applies sorting to the allCustomer array.
 */
  applySorting(): void {
    const sortField = this.sortField; 
  
    if (sortField) {
        this.allCustomer.sort((a, b) => {
          const aValue = (a as any)[sortField];
          const bValue = (b as any)[sortField];
  
            if (!aValue || !bValue) return 0;
  
            const comparison = aValue.toString().localeCompare(bValue.toString());
  
            return this.sortOrder === 'asc' ? comparison : -comparison;
        });
    }
  }
}
