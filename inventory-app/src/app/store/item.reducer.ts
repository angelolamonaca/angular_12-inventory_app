import {createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Item} from './item.model';
import * as ItemActions from './item.actions';

export const itemsFeatureKey = 'itemState';

export interface ItemState extends EntityState<Item> {
  itemState: ItemState;
  // additional entities state properties
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialState: EntityState<Item> = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(ItemActions.addItem,
    (state, action) => adapter.addOne(action.item, state)
  ),
  on(ItemActions.upsertItem,
    (state, action) => adapter.upsertOne(action.item, state)
  ),
  on(ItemActions.addItems,
    (state, action) => adapter.addMany(action.items, state)
  ),
  on(ItemActions.upsertItems,
    (state, action) => adapter.upsertMany(action.items, state)
  ),
  on(ItemActions.updateItem,
    (state, action) => adapter.updateOne(action.item, state)
  ),
  on(ItemActions.updateItems,
    (state, action) => adapter.updateMany(action.items, state)
  ),
  on(ItemActions.deleteItem,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ItemActions.deleteItems,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ItemActions.loadItems,
    (state, action) => adapter.setAll(action.items, state)
  ),
  on(ItemActions.clearItems,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
