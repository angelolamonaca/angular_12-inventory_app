import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InventoryTableComponent} from './inventory-table.component';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {of} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";

describe('InventoryTableComponent', () => {
  let component: InventoryTableComponent;
  let fixture: ComponentFixture<InventoryTableComponent>;

  beforeEach(async () => {
    class StoreMock {
      select = jasmine.createSpy().and.returnValue(of({}));
      dispatch = jasmine.createSpy();
      pipe = jasmine.createSpy().and.returnValue(of('success'));
    }
    await TestBed.configureTestingModule({
      declarations: [InventoryTableComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {}
        },
        {
          provide: Store,
          useClass: StoreMock
        },
        provideMockStore()
      ]
    })
      .compileComponents();

    TestBed.inject(Store);
    fixture = TestBed.createComponent(InventoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
