import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Observable, Subject} from 'rxjs';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<void>();
  private serverUrl = 'https://ng-recipe-book-59ebb.firebaseio.com'; // TODO

  constructor(private http: Http, private authService: AuthService) {
  }

  private recipes: Recipe[] = [
    new Recipe('A test recipe',
      'this is a simple recipe',
      'https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 100)]
    ),
    new Recipe('A test recipe2',
      'this is a simple recipe2',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-BkJu9qJPvJZD_L63Je26vHFQuUx9f88-mWZC2Fhv9jiQUXU',
      [new Ingredient('Buns', 2), new Ingredient('Soft Meat', 3)])
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  setRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next();
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next();
  }

  addRecipe(recipe: Recipe) {
    const nextId = this.recipes.length;
    this.recipes[nextId] = recipe;
    this.recipesChanged.next();
    return nextId;
  }

  replaceRecipes(r: Recipe[]) {
    this.recipes = r;
    this.recipesChanged.next();
  }

  storeRecipes(recipes: Recipe[]) {
    console.log('save to server ');
    console.log(recipes);
    const token = this.authService.getToken();
    return this.http.put(this.serverUrl + '/data.json?auth=' + token, recipes);
  }

  fetchRecipes() {

    const token = this.authService.getToken();
    return this.http.get(this.serverUrl + '/data.json?auth=' + token)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }
}
