import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";

export class Ingredient {
  id: number;
  unit: string;
  measure: string;
  ingredient: string;
  recipeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  usuario: any;
  endPoint = "http://localhost:4000/api/recipeIngredients";

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


  async createIngredient(ingredient, recipeId){
   // recipeId = 3;
    const formData = new FormData();
    formData.append("unit", ingredient.unit);
    formData.append("measure", ingredient.measure);
    formData.append("ingredient", ingredient.ingredient);
    formData.append("recipeId", recipeId);
    console.log("unidad"+ingredient.unit);
    console.log("medida"+ingredient.measure);
    console.log("uningrediente"+ingredient.ingredient);
    console.log("formData "+formData.get("unit"));
    console.log("formData "+formData.get("measure"));
    console.log("formData "+formData.get("ingredient"));

    return this.httpClient.post(this.endPoint, formData);
  }


  getMyIngredients(recipeId, token): Observable<Ingredient[]> {
    let myOptions = this.getOptions(token);
    //  return this.httpClient.get<Recipe[]>(this.endPoint + '/' + id );
    return this.httpClient.get<Ingredient[]>(
      `${this.AUTH_SERVER_ADDRESS}/api/recipeIngredients/recipe/` + recipeId,
      myOptions
    );
  }


}
