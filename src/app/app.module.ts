import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {MatMenuModule} from '@angular/material/menu';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DatePipe } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { DialogAddTasksComponent } from './dialog-add-tasks/dialog-add-tasks.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import { DialogEditTasksComponent } from './dialog-edit-tasks/dialog-edit-tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NewsComponent } from './news/news.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartDashComponent } from './chart-dash/chart-dash.component';
import { DialogAddCustomerComponent } from './dialog-add-customer/dialog-add-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DialogEditCustomerComponent } from './dialog-edit-customer/dialog-edit-customer.component';





var firebaseConfig = {
  apiKey: "AIzaSyCUxwFH9TO3m4y7E1FPoSxDKtWlHDa8fpk",
  authDomain: "simple-crm-c83cb.firebaseapp.com",
  projectId: "simple-crm-c83cb",
  storageBucket: "simple-crm-c83cb.appspot.com",
  messagingSenderId: "714817168307",
  appId: "1:714817168307:web:5d0acbb7f336313d6fa1c6"
};
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditUserComponent,
    TasksComponent,
    DialogAddTasksComponent,
    TasksDetailComponent,
    DialogEditTasksComponent,
    CalendarComponent,
    NewsComponent,
    SignInComponent,
    ChartDashComponent,
    DialogAddCustomerComponent,
    CustomerComponent,
    CustomerDetailComponent,
    DialogEditCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    DatePipe,
    MatRadioModule,
    MatAutocompleteModule,
    FullCalendarModule,
    NgChartsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    AngularFireAuthModule,


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
