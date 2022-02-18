import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'project';
  logIn : any;
  constructor(private service: ApiService, private router:Router , private dialog:MatDialog){
this.service.isAuth.subscribe((res:any) =>{
this.logIn = res;

});

  }

  logOut(){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Log Out',
        message: 'Are you sure, you want to log out ?'
      }
    });
    confirmDialog.afterClosed().subscribe((result:any) => {
      if (result === true) {
        this.service.isAuth.next(false);
        window.localStorage.removeItem('auth');
    this.router.navigateByUrl('/login');
      }
    });

  }
}
