import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemDialogComponent} from "./item-dialog.component";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ItemState} from "../store/item.reducer";
import * as ItemActions from "../store/item.actions";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";

describe('InventoryTableComponent', () => {
  let component: ItemDialogComponent;
  let fixture: ComponentFixture<ItemDialogComponent>;
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
  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        FormsModule
      ],
      declarations: [ItemDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState}),
        {
          provide: MatDialogRef,
          useValue: dialogMock
        }
        ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ItemDialogComponent);
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

  it('should add Item Amount in the store', () => {
    component.newItem  = {
      id: new Date().getTime(),
      name: 'Test',
      amount: 1,
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString()
    };
    component.addItem();
    expect(store.dispatch).toHaveBeenCalledWith(ItemActions.addItem({
      item: {
        id: new Date().getTime(),
        name: 'Test',
        amount: 1,
        createdAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString()
      }
    }))
  });
});
