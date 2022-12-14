import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Users } from '../registration/user';
import { Email } from '../reset-acc/Email';
import { Pass } from '../set-new-password/pass';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

isloggedIn=false;
isstaff=false;
  constructor(private http: HttpClient) {
  }

  //checks of any user ( staff/manager ) is logged in
  isUserLoggedIn(): boolean {
    if (localStorage.getItem('role') === null) {
      return false;
    }
    return true;
  }

  isStaff(): boolean {
    if (localStorage.getItem('role') === 'staff') {
      return true;
    }
    return false;
  }

  //requests to backend 
  //registers user 
  saveUser(user: Users) {
    return this.http.post("http://localhost:8080/user", user)    // return of(user);
  }

  //login 
  userLogin(user: Users) {
    return this.http.post("http://localhost:8080/login/", user, { responseType: 'text' });

  }
//sends users email to their respective account with a verification code
  resetLink(email:string){
    return this.http.get(`http://localhost:8080/sendemail?email=${email}`);
  }

  // code is matched in backend
  verify(pass:Pass){
    return this.http.post("http://localhost:8080/verify/",pass)
  }

  //new passwords are set 
  setPass(pass:Pass){
    return this.http.post("http://localhost:8080/setPass/",pass)
  }


}
