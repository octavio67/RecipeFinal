import { IngredientService } from "./../services/ingredient.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
//import { RecipeService } from "../services/recipe.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-add-ingredient",
  templateUrl: "./add-ingredient.page.html",
  styleUrls: ["./add-ingredient.page.scss"],
})
export class AddIngredientPage implements OnInit {
  ingredients: any = [];
  ingredientForm: FormGroup;
  isSubmitted = false;
  id = null;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  //  private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private router: Router,
    private storage: Storage
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ionViewWillEnter() {
    this.ingredientForm.reset();
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.ingredientForm = this.formBuilder.group({
      unit: [""],
      measure: [""],
      ingredient: [""],
    });
  }

  async submitIngredientForm() {
    this.isSubmitted = true;
    if (!this.ingredientForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      let recipeId = 3;

      (
        await this.ingredientService.createIngredient(
        //  this.id,
          this.ingredientForm.value,
          recipeId
        )
      ).subscribe((data) => {
        console.log("Ingredient created!");
        this.router.navigateByUrl("/add-recipe");
      });
    }
  }


  
}
