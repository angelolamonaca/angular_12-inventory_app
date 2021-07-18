import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {MatDialog} from '@angular/material/dialog';
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";

import {Store} from "@ngrx/store";
import {Item} from '../store/item.model';
import {ItemState, selectAll} from "../store/item.reducer";
import {itemSelector} from "../store/item.selector";
import {getItems} from "../store/item.actions";
import {Action} from "rxjs/internal/scheduler/Action";


@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})

export class InventoryTableComponent implements OnInit {
  items: (Item | undefined)[] = [];
  displayedColumns: string[] = ['name', 'amount', 'createdAt', 'lastUpdatedAt', 'delete'];

  constructor(public dialog: MatDialog,
              private store: Store<ItemState>) {
  }

  ngOnInit(): void {
    this.store.select(itemSelector).subscribe(
      items => {
        this.store.dispatch(getItems())
        this.items = Object.values(items.entities)
      }
    )
  }

  @ViewChild(MatTable) table!: MatTable<Item>;

  openDialog(): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: this.items
    });
  }

  removeItem(id: string) {
    console.log('remove item with id: ' + id)
    this.items.pop();
    this.table.renderRows();
  }

}
