import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
  }

  private fetchRecipe(id: number) {
    this.recipe = this.recipeService.getRecipe(id);
  }

  private renderNewRecipe() {
    this.recipe = new Recipe('', '', 'https://wiki.manjaro.org/images/5/51/New-Logo.png', []);
  }

  ngOnInit() {
    this.route.params.subscribe(
      (p: Params) => {
        this.id = +p.id;
        this.editMode = p.id !== undefined;
        this.editMode ? this.fetchRecipe(this.id) : this.renderNewRecipe();
      }
    );
  }

  onSaveRecipe() {
    console.log(this.id);
    console.log(this.recipe);
    console.log('saving');
    if (this.editMode) {
      this.recipeService.setRecipe(this.id, this.recipe);
    } else {
      this.id = this.recipeService.addRecipe(this.recipe);
    }
    this.router.navigate(['/recipes', this.id]);
  }
}
