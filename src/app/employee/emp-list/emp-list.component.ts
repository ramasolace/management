import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AddEmpComponent } from '../add-emp/add-emp.component';
export interface empData {
  id: number,
  firstName:string,
  LastName:string,
  address:string,
  mobile:string,
  birthDate:string,
  city:string
}

const ELEMENT_DATA: empData[] = [];
@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {
  empData: any;
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'address', 'birthDate', 'mobile', 'city','action'];
  dataSource = ELEMENT_DATA;
  constructor(private service: ApiService,public dialog: MatDialog, private toastr :ToastrService) { }

    ngOnInit():void {
    this.getEmpData();
    
  }

  openDialog(id:any): void {
    console.log(id);
    const dialogRef = this.dialog.open(AddEmpComponent, {
      width: '50%',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getEmpData();
    });
  }
  
  getEmpData(){
    this.service.getAll().subscribe((res:any)=>{
      this.dataSource = res;
      console.log( this.dataSource);
    });
  }

 
  deleteEmp(id:any){
    console.log(id);
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Employee',
        message: 'Are you sure, you want to remove an employee: ' + 'employeeObj.Name'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
     this.service.deleteEmployee(id).subscribe(res=>{
      this.toastr.success('Employee deleted.')
      this.getEmpData();
    })
      }
    });

  }
}
