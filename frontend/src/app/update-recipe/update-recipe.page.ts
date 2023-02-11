import { IngredientService } from './../services/ingredient.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotoService } from "../services/photo.service";
import { RecipeService } from "../services/recipe.service";
import { Storage } from "@ionic/storage";
import { CategoryService } from "../services/category.service";

@Component({
  selector: "app-update-recipe",
  templateUrl: "./update-recipe.page.html",
  styleUrls: ["./update-recipe.page.scss"],
})
export class UpdateRecipePage implements OnInit {
  categories: any = [];
  ingredients: any = [];
  categoryId: any;
  updateRecipeForm: FormGroup;
  isSubmitted = false;
  id: any;
  capturedPhoto = "";
  imageSaved: string = "";

  constructor(
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private photoService: PhotoService,
    private storage: Storage
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.categoryId = this.storage.get("categoryId_st");
  }

  async ionViewWillEnter() {
    this.findRecipe(this.id);
    this.updateRecipeForm = this.formBuilder.group({
      tittle: [""],
      description: [""],
      filename: [""],
      categoryId: [""],
    });
    this.capturedPhoto = "";
  //  this.categoryId = await this.storage.get("categoryId_st");
  //  console.log("storage" + this.categoryId);
    //this.categoryId = 5;
  }

  async ngOnInit() {
    this.findRecipe(this.id);
    this.updateRecipeForm = this.formBuilder.group({
      tittle: [""],
      description: [""],
      filename: [""],
      categoryId: [""],
    });
    this.capturedPhoto = "";
    this.getAllCategories();
    this.getAllIngredientsByRecipe();
    //   this.categoryId=5;
    //  let categoryId= await this.storage.get("categoryId_st");
      this.categoryId= await this.storage.get("categoryId_st");
    // console.log("ngoninit " + categoryId);
  }

  async findRecipe(id) {
    let token = await this.storage.get("token");
    this.recipeService.getRecipe(this.id, token).subscribe(async (data) => {
      this.imageSaved = data["filename"];
      this.updateRecipeForm.setValue({
        tittle: data["tittle"],
        description: data["description"],
        filename: data["filename"],
        categoryId: data["categoryId"],
      });
      this.getCategoryId(this.id);

    });
  }

  async ObtenerCategoryId(e) {
    console.log("valor seleccionado" + e.detail.value);
    let categoryId = await this.storage.set("categoryId_st", e.detail.value);
  }

  async getCategoryId(id) {
    let token = await this.storage.get("token");

    this.recipeService.getRecipe(this.id, token).subscribe(
      async (res) => {
        //   let categoryId = null;
        this.storage.remove("categoryId_st");

        console.log("respuesta del res " + JSON.stringify(res["categoryId"]));
        this.categoryId = await this.storage.set(
          "categoryId_st",
          JSON.stringify(res["categoryId"])
        );
        //   console.log("storage categoryId "+categoryId);
        //    this.categoryId = JSON.stringify(res["categoryId"]);
        //   this.categories.push(res);
        //   this.categoryId = this.categories.push(res);
        // this.categoryId = res;
      },
      (error) => {
        console.log(error);
        console.log("User not authenticated. Please log in");
        this.router.navigateByUrl("/home");
      }
    );
  }

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

  async getAllIngredientsByRecipe() {
    let token = await this.storage.get("token");

    this.ingredientService.getMyIngredients(this.id, token).subscribe(
      async (res) => {
        console.log("ingredientes"+res);
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
 //   this.ionViewWillEnter();
    this.router.navigateByUrl("add-ingredient");
  }

  async onSubmit() {
    this.isSubmitted = true;

    if (!this.updateRecipeForm.valid) {
      return false;
    } else {
      let blob = null;
      //   if (this.capturedPhoto !== "") {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
      //   }
      (
        await this.recipeService.updateRecipe(
          this.id,
          this.updateRecipeForm.value,
          blob,
          this.categoryId
        )
      ).subscribe((data) => {
        console.log("¡Photo sent!");
        this.updateRecipeForm.reset();
        this.router.navigate(["/you-are-logged-in"]);
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
    return this.updateRecipeForm.controls;
  }
}
