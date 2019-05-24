import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {AppState} from '../../shopping-list/store/shopping-list-reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute,
              private recipeService: RecipeService, private store: Store<AppState>) {
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
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelRecipe() {
    console.log('delete recipe: ' + this.id);
    this.recipeService.deleteRecipe(this.id);
  }
}
