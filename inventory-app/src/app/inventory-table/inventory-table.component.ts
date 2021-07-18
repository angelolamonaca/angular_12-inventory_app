import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {MatDialog} from '@angular/material/dialog';
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";

import {Store} from "@ngrx/store";
import {Item} from '../store/item.model';
import {ItemState} from "../store/item.reducer";
import {itemSelector} from "../store/item.selector";
import {deleteItem, getItems, updateItem} from "../store/item.actions";
import {Update} from "@ngrx/entity";


@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})

export class InventoryTableComponent implements OnInit {
  items: (Item | undefined)[] = [];
  displayedColumns: string[] = ['status', 'name', 'amount', 'createdAt', 'lastUpdatedAt', 'delete'];

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
      width: '250px'
    });
  }

  removeItem(id: string) {
    this.store.dispatch(deleteItem({id: id}))
  }

  increaseItemAmount(item: Item) {
    let updated: Item = {id: item.id, amount:item.amount+1, lastUpdatedAt:new Date(), name:item.name, createdAt:item.createdAt}
    this.store.dispatch(updateItem({item: {id:item.id!, changes: updated}}))
  }

  decreaseItemAmount(item: Item) {
    let updated: Item = {id: item.id, amount:item.amount-1, lastUpdatedAt:new Date(), name:item.name, createdAt:item.createdAt}
    this.store.dispatch(updateItem({item: {id:item.id!, changes: updated}}))
  }
}
