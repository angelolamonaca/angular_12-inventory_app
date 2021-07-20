import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InventoryTableComponent} from './inventory-table.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ItemState} from "../store/item.reducer";
import * as ItemActions from "../store/item.actions";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

describe('InventoryTableComponent', () => {
  let component: InventoryTableComponent;
  let fixture: ComponentFixture<InventoryTableComponent>;
  let store: MockStore<ItemState>

  const initialState = {
    ids: [1, 2],
    entities: {
      [1]: {
        id: 1,
        name: 'Test1',
        amount: 1
      },
      [2]: {
        id: 2,
        name: 'Test2',
        amount: 2
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule
      ],
      declarations: [InventoryTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({initialState})]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(InventoryTableComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
    const baseTime = new Date(2013, 9, 23);
    jasmine.clock().mockDate(baseTime);

  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase Item Amount in the store', () => {
    const itemId = "1";
    component.increaseItemAmount(parseInt(itemId), initialState.entities[itemId].amount);
    expect(store.dispatch).toHaveBeenCalledWith(ItemActions.updateItem({
      item: {
        id: 1,
        changes: {
          amount: 2,
          lastUpdatedAt: new Date().toISOString()
        }
      }
    }))
  });

  it('should decrease Item Amount in the store', () => {
    const itemId = "2";
    component.decreaseItemAmount(parseInt(itemId), initialState.entities[itemId].amount);
    expect(store.dispatch).toHaveBeenCalledWith(ItemActions.updateItem({
      item: {
        id: 2,
        changes: {
          amount: 1,
          lastUpdatedAt: new Date().toISOString()
        }
      }
    }))
  });
});
