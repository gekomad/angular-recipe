import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, UpdateIngredient} from '../store/shopping-list.actions';
import {AppState, State} from '../store/shopping-list-reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode: boolean;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingListStore').subscribe(
      (data: State) => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({ingredient: newIngredient}));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.slForm.onReset();
  }

  onDelItem(form: NgForm) {
    this.store.dispatch(new DeleteIngredient());
    form.onReset();
    this.editMode = false;
  }

  onClearItem(form: NgForm) {
    form.onReset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
