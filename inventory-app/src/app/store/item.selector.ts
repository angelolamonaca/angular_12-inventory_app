import {createSelector} from "@ngrx/store";
import {ItemState} from "./item.reducer";

export const itemSelector = createSelector(
  (state: ItemState) => state.itemState,
  (itemState: ItemState) =>  itemState
);

