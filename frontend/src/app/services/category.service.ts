import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/* export class Recipe {
  id: number;
  tittle: string;
  derscription: string;
  filename: string;
  userId: number;
  categoryId: number;
} */

export class Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 // usuario: any;
 // endPoint = "http://localhost:4000/api/recipes";

  AUTH_SERVER_ADDRESS: string = "http://localhost:4000";

  constructor(private httpClient: HttpClient) { }

  private getOptions(token) {
    let bearerAccess = "Bearer " + token;

    let options = {
      headers: {
        Authorization: bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
        "Content-Type": "application/json",
      },
      //, withCredentials: true
    };

    return options;
  }

  getCategory(id, token): Observable<Category[]> {
    let myOptions = this.getOptions(token);
    //  return this.httpClient.get<Category[]>(this.endPoint + '/' + id );
    return this.httpClient.get<Category[]>(
      `${this.AUTH_SERVER_ADDRESS}/api/categories/` + id,
      myOptions
    );
  }


  getCategories(token): Observable<Category[]> {
    let myOptions = this.getOptions(token);
    console.log(myOptions);
    return this.httpClient.get<Category[]>(
      `${this.AUTH_SERVER_ADDRESS}/api/categories/`,
      myOptions
    );
  }

}
