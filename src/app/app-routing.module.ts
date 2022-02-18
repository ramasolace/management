import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
},
{
  path: 'emp',
  canActivate: [AuthGuardService],
  loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
},
{
  path: 'home',
  canActivate: [AuthGuardService],
  component: HomeComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
