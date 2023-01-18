import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotoService } from "../services/photo.service";
import { RecipeService } from "../services/recipe.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-update-recipe",
  templateUrl: "./update-recipe.page.html",
  styleUrls: ["./update-recipe.page.scss"],
})
export class UpdateRecipePage implements OnInit {
  updateRecipeForm: FormGroup;
  isSubmitted = false;
  id: any;
  capturedPhoto = '';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  imageSaved: string = '';

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private photoService: PhotoService,
    private storage: Storage
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  //  this.token = this.storage.get("token");
  }

  ngOnInit() {
    this.findRecipe(this.id);
    this.updateRecipeForm = this.formBuilder.group({
      tittle: [''],
      category: [''],
      filename: ['']
    },
    );
  }

   /* ionViewDidEnter(){
    this.findRecipe(this.id);
    this.updateRecipeForm = this.formBuilder.group({
      name: [''],
      category: [''],
      filename: ['']
    });
  }  */

  async findRecipe(id) {
    let token = await this.storage.get("token");
    this.recipeService.getRecipe(this.id, token).subscribe(async data => {
      this.imageSaved = data['filename'];
      this.updateRecipeForm.setValue({
        tittle: data['tittle'],
        category: data['category'],
        filename: data['filename'],
        
      });
    });
  }

  async onSubmit() {
    this.isSubmitted = true;
    let token =  this.storage.get("token");
    console.log(token);
    if (!this.updateRecipeForm.valid) {
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto !== "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      
      this.recipeService
        .updateRecipe(this.id, this.updateRecipeForm.value, blob)
        .subscribe(() => {
          this.updateRecipeForm.reset();
          this.router.navigate(['/you-are-logged-in']);
        });
    }
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
    console.log(this.updateRecipeForm.controls);
    return this.updateRecipeForm.controls;
  }
}
