import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";

import {select, Store} from "@ngrx/store";
import {Item} from '../store/item.model';
import {ItemState} from "../store/item.reducer";
import {itemSelector} from "../store/item.selector";
import {deleteItem, getItems, updateItem} from "../store/item.actions";


@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})

export class InventoryTableComponent implements OnInit {
  items: (Item | undefined)[] = [];
  displayedColumns: string[] = ['status', 'name', 'amount', 'info', 'delete'];

  constructor(public dialog: MatDialog,
              private store: Store<ItemState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(itemSelector)).subscribe(
      items => {
        this.store.dispatch(getItems())
        this.items = Object.values(items.entities)
      }
    )
  }

  @ViewChild(MatTable) table!: MatTable<Item>;

  addItem(): void {
    const dialogRef: MatDialogRef<ItemDialogComponent> = this.dialog.open(ItemDialogComponent, {
      width: '250px'
    });
  }

  infoItem(item: Item): void {
    const dialogRef: MatDialogRef<ItemDetailsDialog> = this.dialog.open(ItemDetailsDialog, {
      width: '250px',
      data: item
    });
  }

  removeItem(id: number): void {
    this.store.dispatch(deleteItem({id: id}))
  }

  increaseItemAmount(id: number, amount: number): void {
    this.store.dispatch(updateItem({item: {id:id, changes: {amount:amount+1, lastUpdatedAt:new Date().toISOString()}}}))
  }

  decreaseItemAmount(id: number, amount: number): void {
    this.store.dispatch(updateItem({item: {id:id, changes: {amount:amount-1, lastUpdatedAt:new Date().toISOString()}}}))
  }
}

@Component({
  selector: 'item-details-dialog',
  template: '' +
    '<h3>Name</h3>' +
    '<p>{{item.name}}</p>' +
    '<br>' +
    '<h3>Created at</h3>' +
    '<p>{{createdAt}}</p>' +
    '<br>' +
    '<h3>Last updated at</h3>' +
    '<p>{{lastUpdatedAt}}</p>',
})
export class ItemDetailsDialog {

  createdAt: Date = new Date(this.item.createdAt!);
  lastUpdatedAt: Date = new Date(this.item.lastUpdatedAt!);

  constructor(
    public dialogRef: MatDialogRef<ItemDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public item: Item) {}

}
