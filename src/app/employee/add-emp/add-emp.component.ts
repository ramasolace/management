import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent implements OnInit {
  selected=true;
  empForm: any;
  todayDate:Date = new Date();
  constructor( public dialogRef: MatDialogRef<AddEmpComponent>, private service: ApiService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.createForm() ;
    if(this.data){
      this.service.getById(this.data).subscribe(res=>{
          console.log(res);
         this.empForm.patchValue(res);  }) 
      }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createForm(): void{
    this.empForm = new FormGroup({
      firstName : new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobile : new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      city: new FormControl('', Validators.required),
      address : new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
    });
  }
 
  onSubmit():void{
    console.log(this.empForm.value);
    if(!this.data){
      this.service.saveEmployee(this.empForm.value).subscribe(res=>{
        console.log(res);
        this.dialogRef.close();
        this.toastr.success('employee succusefully created.')
      });
    }else{
      this.service.update(this.data,this.empForm.value);
      this.dialogRef.close();
      this.toastr.success('Data succusefully updated.')
    }
    
  }
}
