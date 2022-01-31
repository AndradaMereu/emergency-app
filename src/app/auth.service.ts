import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginUser } from './loginUser'
import { User } from './User';


@Injectable()
export class AuthService {


  private userSubject = new BehaviorSubject<any>(null);
  public user!: Observable<User>;
  public islogged: Boolean =false;
  private apiServerUrl = environment.baseUrl;
  public jwtHelper: JwtHelperService;


  constructor(
    private router: Router, private http: HttpClient, public jwtHelperService: JwtHelperService
  ) {
    this.jwtHelper = jwtHelperService;
   }
   

  login(user: LoginUser): Observable<any> {
    console.log("is in service");
    return this.http.post<any>(`${this.apiServerUrl}/login`,
      user
    );

  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public isAuthenticated(): boolean {
    const token: any = localStorage.getItem('authorization');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
    // return true;

  }


  getCurrentUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('badgenumber')
    console.log(!(user === null))
    return !(user === null)
    // return true;
  }

  logOut() {
    this.islogged=false;
    sessionStorage.removeItem('badgenumber');
    localStorage.removeItem('authorization');
  }



}