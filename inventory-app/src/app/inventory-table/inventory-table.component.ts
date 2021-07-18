import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";

import {Store} from "@ngrx/store";
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
    this.store.select(itemSelector).subscribe(
      items => {
        this.store.dispatch(getItems())
        this.items = Object.values(items.entities)
      }
    )
  }

  @ViewChild(MatTable) table!: MatTable<Item>;

  addItem(): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px'
    });
  }

  infoItem(item: Item): void {
    const dialogRef = this.dialog.open(ItemDetailsDialog, {
      width: '250px',
      data: item
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

@Component({
  selector: 'item-details-dialog',
  template: '<h3>Name</h3><p>{{item.name}}</p><br><h3>Created at</h3><p>{{item.createdAt}}</p><br><h3>Last updated at</h3><p>{{item.lastUpdatedAt}}</p>',
})
export class ItemDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<ItemDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public item: Item) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
