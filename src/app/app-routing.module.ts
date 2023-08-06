import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {path: '', component: DashboardComponent  },
  {path: 'dashboard', component: DashboardComponent  },
  {path: 'user', component: UserComponent  },
  {path: 'user/:id', component: UserDetailComponent  },
  {path: 'tasks', component: TasksComponent  },
  {path: 'tasks/:id', component: TasksDetailComponent  },
  {path: 'calendar', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
