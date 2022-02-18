import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ApiService {
  isAuth:any = new BehaviorSubject('');
  constructor(private http: HttpClient, private toastr:ToastrService) {
    const token = window.localStorage.getItem('auth');
    this.isAuth.next(token);
   }
  private url = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  managerRegister(data:any){
    data.auth = true;
    return this.http.post<any>(this.url + '/manager',data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  user(){
    return this.http.get<any>(this.url + '/manager')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  logIn(){
    return this.http.get<any>(this.url + '/manager')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  saveEmployee(data:any){
    return this.http.post<any>(this.url + '/posts',data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteEmployee(id:any){
    return this.http.delete(this.url+'/posts/'+ id);
  }

  getById(id:any): Observable<any> {
    return this.http.get<any>(this.url + '/posts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<any> {
    return this.http.get(this.url+'/posts')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:any, data:any): Observable<any> {
    data.id = id;
    console.log(data);
    return this.http.put<any>(this.url + '/posts/' + id ,
    {
      id: data.id,
      firstName: data.firstname
    }
    , this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:any){
    return this.http.delete<any>(this.url + '/posts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      this.toastr.error(errorMessage);
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.toastr.error(errorMessage);
    }
    console.log(errorMessage);
    return errorMessage;
 }
}
