import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpListComponent } from './emp-list/emp-list.component';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../material.module';


@NgModule({
  declarations: [
    EmpListComponent,
    AddEmpComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EmpListComponent,
    AddEmpComponent
  ]
})
export class EmployeeModule { }
