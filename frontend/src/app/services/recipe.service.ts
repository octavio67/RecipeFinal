import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";

export class Recipe {
  id: number;
  tittle: string;
  description: string;
  filename: string;
  userId: number;
  categoryId: number;
}

/* export class User {
  id: number;
  password: string;
  username: string;
  email: string;
  isAdmin: boolean;

} */

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  usuario: any;
  endPoint = "http://localhost:4000/api/recipes";

  AUTH_SERVER_ADDRESS: string = "http://localhost:4000";

  constructor(private httpClient: HttpClient, private storage: Storage) {}

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

  async createRecipe(id_user, recipe, blob, categoryId) {
    id_user = await this.storage.get('id_user_st');
    categoryId = await this.storage.get('categoryId_st');
    const formData = new FormData();
    formData.append("tittle", recipe.tittle);
    formData.append("description", recipe.description);
    formData.append("file", blob);
    formData.append("userId", id_user);
    formData.append("categoryId", categoryId);

   //  let myOptions = this.getOptions(token);

    return this.httpClient.post(this.endPoint, formData);
   //   return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/recipes`, formData, myOptions);
  }

  /*getRecipeCategoryId(id, token): Observable<Recipe[]> {
    let myOptions = this.getOptions(token);
    //  return this.httpClient.get<Recipe[]>(this.endPoint + '/' + id );
    return this.httpClient.get<Recipe[]>(
      `${this.AUTH_SERVER_ADDRESS}/api/recipes/category/` + id,
      myOptions
    );
  }*/

  getRecipe(id, token): Observable<Recipe[]> {
    let myOptions = this.getOptions(token);
    //  return this.httpClient.get<Recipe[]>(this.endPoint + '/' + id );
    return this.httpClient.get<Recipe[]>(
      `${this.AUTH_SERVER_ADDRESS}/api/recipes/` + id,
      myOptions
    );
  }

  getMyRecipes(userId, token): Observable<Recipe[]> {
    let myOptions = this.getOptions(token);
    //  return this.httpClient.get<Recipe[]>(this.endPoint + '/' + id );
    return this.httpClient.get<Recipe[]>(
      `${this.AUTH_SERVER_ADDRESS}/api/recipes/user/` + userId,
      myOptions
    );
  }

  getRecipes(token): Observable<Recipe[]> {
    let myOptions = this.getOptions(token);
    console.log(myOptions);
    return this.httpClient.get<Recipe[]>(
      `${this.AUTH_SERVER_ADDRESS}/api/recipes/`,
      myOptions
    );
  }

  deleteRecipe(id, token) {
    let myOptions = this.getOptions(token);
   // return this.httpClient.delete<Recipe[]>(this.endPoint + '/' + id, this.httpOptions);
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/api/recipes/` + id, myOptions);

  }

  /* deleteAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.delete<Recipe[]>(this.endPoint);
  }*/

  async updateRecipe(id, recipe, blob, categoryId) {
    // let myOptions = this.getOptions(token);
   // categoryId = await this.storage.get('categoryId');
    const formData = new FormData();
    formData.append('tittle', recipe.tittle);
    formData.append('description', recipe.description);
    formData.append('file', blob);
    formData.append("categoryId", categoryId);
  

    return this.httpClient.put(this.endPoint + "/" + id, formData);
    // return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/api/recipes/` + id, formData, myOptions);
  }
}
