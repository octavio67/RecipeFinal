import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

export class Recipe {
  id: number;
  tittle: string;
  category: string;
  filename: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  endPoint = 'http://localhost:4000/api/recipes/';

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  private getOptions(token){

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Type' : 'application/json',
      }
      //, withCredentials: true
    };

    return options;
  }


  /*createRecipe(recipe, blob, token){
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('category', recipe.category);
    formData.append('file', blob);

    let myOptions = this.getOptions(token);

   // return this.httpClient.post(myOptions, formData);
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/recipes`, myOptions);
  }*/

  getRecipe(id, token): Observable<Recipe[]> {
    let myOptions = this.getOptions(token);
  //  return this.httpClient.get<Recipe[]>(this.endPoint + '/' + id );
    return this.httpClient.get<Recipe[]>(`${this.AUTH_SERVER_ADDRESS}/api/recipes/` + id, myOptions);
  }

  getMyRecipes(userId, token): Observable<Recipe[]> {
    let myOptions = this.getOptions(token);
  //  return this.httpClient.get<Recipe[]>(this.endPoint + '/' + id );
    return this.httpClient.get<Recipe[]>(`${this.AUTH_SERVER_ADDRESS}/api/recipes/user/` + userId, myOptions);
  }

  getRecipes(token): Observable<Recipe[]> {
    let myOptions = this.getOptions(token);
    console.log(myOptions)
    return this.httpClient.get<Recipe[]>(`${this.AUTH_SERVER_ADDRESS}/api/recipes/`, myOptions);
  }

  /*deleteRecipe(id) {
    let myOptions = this.getOptions(token);
   // return this.httpClient.delete<Recipe[]>(this.endPoint + '/' + id, this.httpOptions);
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/api/recipes/` + id, myOptions);

  }*/

 /* deleteAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.delete<Recipe[]>(this.endPoint);
  }*/

  updateRecipe(id, recipe, blob) {
   // let myOptions = this.getOptions(token);
    const formData = new FormData();
    formData.append('tittle', recipe.tittle);
    formData.append('category', recipe.category);
    formData.append('file', blob);

    return this.httpClient.put(this.endPoint + id, formData);
   // return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/api/recipes/` + id, formData, myOptions);
  }
}
