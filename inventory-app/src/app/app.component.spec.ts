import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {}
        },
        {
          provide: MatDialog,
          useValue: {}
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'inventory-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('inventory-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('Inventory App');
  });
});
