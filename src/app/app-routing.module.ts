import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DatesComponent } from './dates/dates.component';
import { DatesDetailComponent } from './dates-detail/dates-detail.component';



const routes: Routes = [
  {path: '', component: DashboardComponent  },
  {path: 'dashboard', component: DashboardComponent  },
  {path: 'user', component: UserComponent  },
  {path: 'user/:id', component: UserDetailComponent  },
  {path: 'tasks', component: TasksComponent  },
  {path: 'tasks/:id', component: TasksDetailComponent  },
  {path: 'calendar', component: CalendarComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'customer', component: CustomerComponent  },
  {path: 'dates', component: DatesComponent  },
  {path: 'dates/:id', component: DatesDetailComponent  },
  {path: 'customer/:id', component: CustomerDetailComponent  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
