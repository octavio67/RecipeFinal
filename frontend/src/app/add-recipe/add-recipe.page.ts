import { IngredientService } from "./../services/ingredient.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotoService } from "../services/photo.service";
import { RecipeService } from "../services/recipe.service";
import { CategoryService } from "./../services/category.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-add-recipe",
  templateUrl: "add-recipe.page.html",
  styleUrls: ["add-recipe.page.scss"],
})
export class AddRecipePage implements OnInit {
  categories: any = [];
  ingredients: any = [];
  recipeForm: FormGroup;
  isSubmitted = false;
  capturedPhoto = "";
  id = null;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private categoryService: CategoryService,
    private photoService: PhotoService,
    private router: Router,
    private storage: Storage
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ionViewWillEnter() {
    this.recipeForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.getAllCategories();
    this.getAllIngredientsByRecipe();
    this.recipeForm = this.formBuilder.group({
      tittle: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering

  async getAllCategories() {
    let token = await this.storage.get("token");

    this.categoryService.getCategories(token).subscribe(
      async (res) => {
        console.log(res);
        this.categories = res;
      },
      (error) => {
        console.log(error);
        console.log("User not authenticated. Please log in");
        this.router.navigateByUrl("/home");
      }
    );
  }

  async ObtenerCategoryId(e) {
    console.log("valor obtenido" + e.detail.value);
    let categoryId = await this.storage.set("categoryId_st", e.detail.value);
  }

  async getAllIngredientsByRecipe() {
    let token = await this.storage.get("token");

    this.ingredientService.getMyIngredients(this.id, token).subscribe(
      async (res) => {
        console.log("ingredientes" + res);
        this.ingredients = res;
      },
      (error) => {
        console.log(error);
        console.log("User not authenticated. Please log in");
        this.router.navigateByUrl("/home");
      }
    );
  }

  addIngredient() {
    this.ionViewWillEnter();
    this.router.navigateByUrl("add-ingredient");
  }

  async submitForm() {
    //  console.log("categoria="+this.id);
    //   let categoryId = await this.storage.set("categoryId", 1);
    //   let categoryId = 1;
    // console.log("categoriaId="+categoryId);
    this.isSubmitted = true;
    if (!this.recipeForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      let blob = null;
      let userId = null;
      if (this.capturedPhoto !== "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      (
        await this.recipeService.createRecipe(
          userId,
          this.recipeForm.value,
          blob,
          this.id
        )
      ).subscribe((data) => {
        console.log("¡Photo sent!");
        //    console.log("categoriaId="+categoryId);
        this.router.navigateByUrl("/you-are-logged-in");
      });
    }
  }

  takePhoto() {
    this.photoService.takePhoto().then((data) => {
      try {
        this.capturedPhoto = data.webPath;
      } catch (e) {
        console.log("Imagen descartada al tomar foto");
        this.capturedPhoto = null;
      }
    });
  }

  pickImage() {
    this.photoService.pickImage().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  get errorControl() {
    return this.recipeForm.controls;
  }
}
