import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState} from './store/shopping-list-reducers';
import {StartEdit} from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingListStore');
  }

  onEditItem(index: number) {
    console.log('onEditItem index: ' + index);
    this.store.dispatch(new StartEdit(index));
  }
}
