import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from  'rxjs/operators';
import { AuthResponse } from './auth-response';
import { User } from './user';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';
 // nombre: string;

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  private getOptions(user: User){
    let base64UserAndPassword = window.btoa(user.email + ":" + user.password);

    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        'Authorization' : basicAccess,
        'Content-Type' : 'application/json'
      }
      //, withCredentials: true
    };

    return options;
  }


  register(user: User): Observable<AuthResponse> {
    console.log(user);
    return this.httpClient.post<AuthResponse>
    (`${this.AUTH_SERVER_ADDRESS}/api/users/`, user, this.getOptions(user)).pipe(
      tap(async (res:  AuthResponse ) => {
        console.log(user);
        if (res.user) {
          await this.storage.set("token", res.access_token);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/users/signin`, null, this.getOptions(user)).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("token", res.access_token);
          this.storage.set("name", res.user.username);
        /*   await this.storage.set("name", res.user.username).then((name) => {
            this.nombre = name; 
          });*/
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("token");
  }

  async isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = await this.storage.get("token");
    if (token){ //Just check if exists. This should be checked with current date
      return true;
    }
    return false;
  }
}
