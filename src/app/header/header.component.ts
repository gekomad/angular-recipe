import {Component} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService, public authService: AuthService) {
  }

  onSave() {
    this.recipeService.storeRecipes(this.recipeService.getRecipes()).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onLoad() {
    this.recipeService.fetchRecipes().subscribe(
      (response) => {
        console.log(response);
        this.recipeService.replaceRecipes(response);
      },
      (error) => console.log(error)
    );
  }

  onLogout() {
    this.authService.logOut();
  }

}
