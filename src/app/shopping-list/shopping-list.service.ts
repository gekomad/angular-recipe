import {Ingredient} from '../shared/ingredient.model';
import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  constructor() {
  }

  getIngredient(i: number): Ingredient {
    return this.ingredients[i];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }


  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(i => this.addIngredient(i));
  }

  addIngredient(ingredient: Ingredient) {
    const name = ingredient.name.trim();

    if (name !== '' && this.ingredients.filter(_ => _.name.toLowerCase() === name.toLowerCase()).length === 0) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  delIngredient(name: string) {
    const newArray = this.ingredients.filter(_ => _.name.trim().toLowerCase() !== name.trim().toLowerCase());
    if (newArray.length !== this.ingredients.length) {
      this.ingredients = newArray;
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  ngOnInit(): void {
  }
}
