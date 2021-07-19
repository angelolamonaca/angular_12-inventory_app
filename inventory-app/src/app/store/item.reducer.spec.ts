import * as fromItem from './item.reducer'

describe('Item Reducer', () => {
  describe('selector', () => {
    it('should return an empty dictionary', () => {
      expect(fromItem.selectEntities(fromItem.initialState)).toEqual({});
    });
  });
});
