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

  ngOnInit(): void {
    this.firestore
      .collection('customers')
      .valueChanges({idField: 'customIdCustomerName'})
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        this.allCustomer = changes;
      });
  }

  selectedCustomer!: Customer;

  get invoiced(): string {
    return `${this.selectedCustomer?.invoiced}`;
}


Math = Math; 
  public barChartLegend = true;
public barChartPlugins = [];

public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  datasets: [
    { data: [ 0.2, 0.5, 0.7, 0.1, 0.8, 0.4, 1.0, 0.8, 0.8, 0.2, 0.6, 0.7 ], label: '2022', backgroundColor: [ 'rgb(1, 209, 255)' ] },
    { data: [ 0.4, 0.8, 0.2, 0.6, 0.4, 1.0, 0.8, 0.2, ], label: '2023', backgroundColor: [ 'rgb(229, 200, 82)' ]  }
  ]
};


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
