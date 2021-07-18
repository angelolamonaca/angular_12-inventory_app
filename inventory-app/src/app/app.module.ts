import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import * as fromItem from './store/item.reducer';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

import {InventoryTableComponent} from './inventory-table/inventory-table.component';
import {ItemDialogComponent} from './item-dialog/item-dialog.component';
import {ItemDetailsDialog} from './inventory-table/inventory-table.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    BrowserAnimationsModule,
    StoreModule.forFeature(fromItem.itemsFeatureKey, fromItem.reducer),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    InventoryTableComponent,
    ItemDialogComponent,
    ItemDetailsDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
