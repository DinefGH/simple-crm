import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/customer.class';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})


  export class CustomerDetailComponent implements OnInit{

    customerId:  string | undefined = '';
    customer: Customer = new Customer();

  
    constructor (public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore ) {}
  

    /**
 * Lifecycle hook that is called after Angular has initialized the component's view.
 */
    ngOnInit() {
      this.route.paramMap.subscribe( paramMap => {
        const id = this.customerId = paramMap.get('id')!;
        this.getCustomer();
    })
    }
  
  /**
 * Fetches customer details based on the customer ID from Firestore.
 */
    getCustomer() {
      this.firestore
      .collection('customers')
      .doc(this.customerId)
      .valueChanges()
      .subscribe(( customerParam: any) => {
        this.customer = new Customer(customerParam);
      });
    }
  
  
  /**
 * Deletes a customer from Firestore based on the customer ID.
 */
    deleteCustomerDetail() {
      this.firestore
      .collection('customers')
      .doc(this.customerId)
      .delete()
      .then(() => {
      })
      .catch((error) => {
          console.error('Error removing customer: ', error);
      });
  }
   
  
  /**
 * Opens a dialog to edit the details of a customer.
 */
    editCustomerDetail() {
      const dialog = this.dialog.open(DialogEditCustomerComponent);
      dialog.componentInstance.customer = new Customer(this.customer.toJSON());
      dialog.componentInstance.customerId = this.customerId;
    }

/**
 * Gets the background color based on the customer's name.
 * @param {string} customerName - The name of the customer.
 * @returns {string} - The color code for the background.
 */
    getBackgroundColorCategory(customerName: string): string {
      switch (customerName) {
        case 'TechFusion Corp.': return '#928f61';
        case 'GreenEarth Energies': return '#639261';
        case 'Galactic AeroSystems': return '#926164';
        case 'Nova Pharmaceuticals': return '#696969';
        default: return '3f51b5'; 
      }
    }
  }
  
