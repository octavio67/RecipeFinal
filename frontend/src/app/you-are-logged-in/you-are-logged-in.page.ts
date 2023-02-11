import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../services/recipe.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
//import { User } from '../auth/user';
// import { timeStamp } from 'console';


@Component({
  selector: 'app-you-are-logged-in',
  templateUrl: './you-are-logged-in.page.html',
  styleUrls: ['./you-are-logged-in.page.scss'],
})
export class YouAreLoggedInPage implements OnInit {

  recipes: any =[];
  id: any ;
  username_user: any
  recipeId: any;
  
 
  constructor(
    private authService: AuthService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    public alertController: AlertController,
    private storage: Storage) { 

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    }

 async ngOnInit() {
  let username_user = await this.storage.get('username_user_st');
  let id = await this.storage.get('id_user_st');
  this.getMyRecipes(id);
  console.log("You are logged in: " + username_user);

  }

  async ionViewDidEnter(){
    let username_user = await this.storage.get('username_user_st');
    let id = await this.storage.get('id_user_st');
    this.getMyRecipes(id);
  }

  /*async getAllRecipes() {
    let token = await this.storage.get("token");
    
    this.recipeService.getRecipes(token).subscribe(async res => {

      console.log(res);
      this.recipes = res;
    }, error => {
      console.log(error);
      console.log("User not authenticated. Please log in");
      this.router.navigateByUrl("/home");
    });
  }*/

  async getMyRecipes(id) {
    let token = await this.storage.get("token");
    
    this.recipeService.getMyRecipes(id, token).subscribe(async res => {

      console.log(res);
      this.recipes = res;
      this.recipeId = await  this.storage.set(
        "recipeIdForIngredients_st",
        JSON.stringify(res["id"])
      );
    }, error => {
      console.log(error);
      console.log("User not authenticated. Please log in");
      this.router.navigateByUrl("/home");
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }


  async deleteRecipe(id) {
    let token = await this.storage.get("token");
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: 'La Receta con id:' + id + ' será eliminada',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.recipeService.deleteRecipe(id, token).subscribe(() => {
              console.log('Receta con id:' + id + ' borrada');
              this.ionViewDidEnter();
            });
          },
        },
      ],
    });
    await alert.present();
  }


  updateRecipe(id) {
    this.ionViewDidEnter();
    this.router.navigateByUrl(`/update-recipe/${id}`);
  }

   addRecipe(){
    this.ionViewDidEnter();
    this.router.navigateByUrl('/add-recipe');
    
  }

}
