import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemDialogComponent} from './item-dialog.component';
import {MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {FormsModule} from "@angular/forms";

describe('ItemDialogComponent', () => {
  let component: ItemDialogComponent;
  let fixture: ComponentFixture<ItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        ItemDialogComponent
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: Store,
          useValue: {}
        }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
