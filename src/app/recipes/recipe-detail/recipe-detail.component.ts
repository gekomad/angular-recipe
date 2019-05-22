import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private sl: ShoppingListService, private router: Router, private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (p: Params) => {
        this.id = +p.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addIngToShoppingList() {
    console.log(this.recipe);
    console.log(this.recipe.ingredients);
    this.sl.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelRecipe() {
    console.log('delete recipe: ' + this.id);
    this.recipeService.deleteRecipe(this.id);
  }
}
