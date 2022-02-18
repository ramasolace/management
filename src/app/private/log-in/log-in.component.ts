import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: any;
  constructor(private service: ApiService, private router :Router,private toastr: ToastrService) { 
  
  }
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
    this.loginForm = new FormGroup({
      userName : new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    
    });
  }

  submit():void{
    this.service.logIn().subscribe(
      res=>{
        console.log(res);
        const status = res.some((e:any) => e.email === this.loginForm.value.userName && e.password === this.loginForm.value.password);
        console.log(status);
    if(status){
      const resData = res.find((e:any) => e.email === this.loginForm.value.userName && e.password === this.loginForm.value.password);
      console.log('sucussefull')
      window.localStorage.setItem('auth', resData.auth);
      this.service.isAuth.next(true);
      this.router.navigateByUrl('/home');
    }else{
      console.log('sorry');
      this.toastr.error('Invalid Credentails!');
      this.service.isAuth.next(false);
    }
      }
    )
  }
}
