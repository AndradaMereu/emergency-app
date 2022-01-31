import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TeamListComponent } from './team-list/team-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'users', component: UserListComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'teams', component: TeamListComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
