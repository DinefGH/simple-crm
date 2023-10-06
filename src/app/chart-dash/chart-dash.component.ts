import { Component, OnInit } from '@angular/core';import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { Customer } from 'src/models/customer.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-chart-dash',
  templateUrl: './chart-dash.component.html',
  styleUrls: ['./chart-dash.component.scss']
})


export class ChartDashComponent {

  
  sortField: string | null = null; // This tracks which field we're sorting by (e.g., 'title', 'priority')
  sortOrder: 'asc' | 'desc' = 'asc'; // This tracks the sort direction
  customer: Customer = new Customer();
  allCustomer: Customer[] = [];
  customIdCustomerName: Customer[] = [];
  currentDate: any;
  searchTerm: string = '';
  constructor(private firestore: AngularFirestore) { }


  /**
 * Angular lifecycle hook to initialize the component.
 * Fetches the list of customers from Firestore and updates the allCustomer array.
 */
  ngOnInit(): void {
    this.firestore
      .collection('customers')
      .valueChanges({idField: 'customIdCustomerName'})
      .subscribe((changes: any) => {
        this.allCustomer = changes;
      });
  }

  /** 
 * Selected customer details.
 * @type {Customer}
 */
  selectedCustomer!: Customer;


  /**
 * Getter function to return the invoiced value of the selected customer.
 * @returns {string} - Invoiced value.
 */
  get invoiced(): string {
    return `${this.selectedCustomer?.invoiced}`;
}

/**
 * Represents the built-in Math object, allowing you to use mathematical functionality.
 * @type {Math}
 */
Math = Math; 

// Charting properties
  public barChartLegend = true;
public barChartPlugins = [];


/**
 * Chart configurations for displaying bar charts.
 */
public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  datasets: [
    { data: [ 0.2, 0.5, 0.7, 0.1, 0.8, 0.4, 1.0, 0.8, 0.8, 0.2, 0.6, 0.7 ], label: '2022', backgroundColor: [ 'rgb(1, 209, 255)' ] },
    { data: [ 0.4, 0.8, 0.2, 0.6, 0.4, 1.0, 0.8, 0.2, ], label: '2023', backgroundColor: [ 'rgb(229, 200, 82)' ]  }
  ]
};


/**
 * Additional options to configure the bar chart.
 */
public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 0.2,
        // Use a callback function to format the tick labels
        callback: function(value) {
          return '€' + value + 'M';
        }
      }
    }
  }
};


/**
 * Gets the sum of the data points for the dataset labeled '2023'.
 * @returns {number} - The sum of the data points.
 */
getSumOfData1(): number {
  let dataset2023 = this.barChartData.datasets.find(dataset => dataset.label === '2023');

  return dataset2023 && dataset2023.data
    ? dataset2023.data.reduce((accumulator: number, value: number | [number, number] | null) => {
          if (typeof value === 'number') {
              return accumulator + value;
          } else if (Array.isArray(value)) {
              // Handle the case where value is an array of numbers, e.g., summing them
              return accumulator + value.reduce((acc, num) => acc + num, 0);
          }
          return accumulator;  // for null or unexpected type, just return the accumulator
      }, 0)
    : 0;
}

}
