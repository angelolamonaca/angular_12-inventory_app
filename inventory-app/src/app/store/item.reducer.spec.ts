import * as fromItem from './item.reducer'
import {Item} from "./item.model";
import {addItem, deleteItem, getItems, updateItem} from "./item.actions";
import {EntityState} from "@ngrx/entity";

describe('Item Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const {initialState} = fromItem;
      const action = {
        type: 'unknown'
      }
      const state = fromItem.reducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
  describe('getItems action', () => {
    it('should return the initial state', () => {
      const {initialState} = fromItem;
      const action = getItems();
      const state = fromItem.reducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
  describe('addItem action', () => {
    it('should return an updated state with the new item added', () => {
      const {initialState} = fromItem;
      const newState: EntityState<Item> = {
        ids: [1],
        entities: {
          [1]: {
            id: 1,
            name: 'Test',
            amount: 1
          }
        }
      };
      const action = addItem({
        item: {
          id: 1,
          name: 'Test',
          amount: 1
        }
      });
      const state = fromItem.reducer(initialState, action);
      expect(state).toEqual(newState);
    });
  });
  describe('updateItem action', () => {
    it('should return an updated state with the updated item', () => {
      const {initialState} = fromItem;
      const newState: EntityState<Item> = {
        ids: [1],
        entities: {
          [1]: {
            id: 1,
            name: 'Test',
            amount: 2
          }
        }
      };
      const addItemAction = addItem({
        item: {
          id: 1,
          name: 'Test',
          amount: 1
        }
      });
      fromItem.reducer(initialState, addItemAction);

      const updateItemAction = updateItem({
        item: {
          id:1,
          changes: {
            name: 'Test',
            amount: 2}
        }
      });
      const state = fromItem.reducer(initialState, updateItemAction);
      expect(state).toEqual(newState);
    });
  });
  describe('removeItem action', () => {
    it('should return an updated state without items', () => {
      const {initialState} = fromItem;
      const newState: EntityState<Item> = {
        ids: [],
        entities: {}
      };
      const addItemAction = addItem({
        item: {
          id: 1,
          name: 'Test',
          amount: 1
        }
      });
      fromItem.reducer(initialState, addItemAction);

      const deleteItemAction = deleteItem({
        id: "1"
      });
      const state = fromItem.reducer(initialState, deleteItemAction);
      expect(state).toEqual(newState);
    });
  });
});
