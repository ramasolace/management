import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  todayDate:Date = new Date();
  constructor(private service: ApiService,private toastr: ToastrService,  private router :Router) { }

  ngOnInit(): void {
    this.service.isAuth.subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.router.navigateByUrl('/home');
      }
    })
    this.createForm();
  }
  createForm(): void{
    this.registerForm = new FormGroup({
      firstName : new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
      address : new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
    });
  }

  submit(){
    this.service.user().subscribe(res=>{
      console.log(res);
      const status = res.some((e:any) => e.email === this.registerForm.value.email);
      if(!status){
        this.service.managerRegister(this.registerForm.value).subscribe(res=>{
          console.log(res);
          this.toastr.success('Register Succusefull')
          this.router.navigateByUrl('/login');
        })
      }
      else{
          this.toastr.warning('Allready exist')
      }
    })
 
  }
}
