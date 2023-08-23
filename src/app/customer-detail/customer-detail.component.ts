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
  
    ngOnInit() {
      this.route.paramMap.subscribe( paramMap => {
        const id = this.customerId = paramMap.get('id')!;
        console.log('GOT Customer ID', this.customerId);
        this.getCustomer();
    })
    }
  
  
    getCustomer() {
      this.firestore
      .collection('customers')
      .doc(this.customerId)
      .valueChanges()
      .subscribe(( customerParam: any) => {
        this.customer = new Customer(customerParam);
        console.log('Retrieved customer', this.customer);
      });
    }
  
  
  
    deleteCustomerDetail() {
      this.firestore
      .collection('customers')
      .doc(this.customerId)
      .delete()
      .then(() => {
          console.log('Customer successfully deleted!');
      })
      .catch((error) => {
          console.error('Error removing customer: ', error);
      });
  }
   
  
    editCustomerDetail() {
      const dialog = this.dialog.open(DialogEditCustomerComponent);
      dialog.componentInstance.customer = new Customer(this.customer.toJSON());
      dialog.componentInstance.customerId = this.customerId;
    }


    getBackgroundColorCategory(customerName: string): string {
      switch (customerName) {
        case 'TechFusion Corp.': return '#928f61';
        case 'GreenEarth Energies': return '#639261';
        case 'Galactic AeroSystems': return '#926164';
        case 'Nova Pharmaceuticals': return '#696969';
        default: return 'white';  // default color for unrecognized categories
      }
    }


    

//     getBackgroundColorPriority(priority: string): string {
//       switch (priority) {
//         case 'Urgent': return 'rgb(255, 61, 0)';
//         case 'Medium': return 'rgb(255, 168, 0)';
//         case 'Low': return 'rgb(122, 226, 41)';
//         // ... and so on for the rest of your categories
//         default: return 'white';  // default color for unrecognized categories
//   }
//   }

//   getBackgroundColorStatus(status: string): string {
//     switch (status) {
//       case 'open': return 'red';
//       case 'done': return 'blue';
//       default: return 'white';  // default color for unrecognized categories
// }
// }
}
  
