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

/**
 * @author angelo.lamonaca@gmail.com
 *
 */

export class InventoryTableComponent implements OnInit {
  items: (Item | undefined)[] = [];
  displayedColumns: string[] = ['status', 'name', 'amount', 'info', 'delete'];

  constructor(public dialog: MatDialog,
              private store: Store<ItemState>) {
  }

  ngOnInit(): void {
    // Retrieve items from the store
    this.store.pipe(select(itemSelector)).subscribe(
      items => {
        this.store.dispatch(getItems())
        this.items = Object.values(items.entities)
      }
    )
  }

  @ViewChild(MatTable) table!: MatTable<Item>;

  /**
   * Opens a dialog with a form for inserting the item in the store
   *
   */
  addItem(): void {
    this.dialog.open(ItemDialogComponent, {
      width: '250px'
    });
  }

  /**
   * Opens a dialog with some item's infos (name, createdBy and lastUpdatedAt)
   *
   * @param item
   */
  infoItem(item: Item): void {
    this.dialog.open(ItemDetailsDialog, {
      width: '250px',
      data: item
    });
  }

  /**
   * Remove an item from the store
   *
   * @param id id of the item
   */
  removeItem(id: number): void {
    this.store.dispatch(deleteItem({id: id}))
  }

  /**
   * Increase the item's amount (update the lastUpdatedAt too)
   *
   * @param id id of the item
   * @param amount the current amount
   */
  increaseItemAmount(id: number, amount: number): void {
    this.store.dispatch(updateItem({
      item: {
        id: id,
        changes: {amount: amount + 1, lastUpdatedAt: new Date().toISOString()}
      }
    }))
  }

  /**
   * Decrease the item's amount (update the lastUpdatedAt too)
   *
   * @param id id of the item
   * @param amount the current amount
   */
  decreaseItemAmount(id: number, amount: number): void {
    this.store.dispatch(updateItem({
      item: {
        id: id,
        changes: {amount: amount - 1, lastUpdatedAt: new Date().toISOString()}
      }
    }))
  }
}

@Component({
  selector: 'item-details-dialog',
  template: '' +
    '<h3>Name</h3>' +
    '<p>{{item.name}}</p>' +
    '<br>' +
    '<h3>Created at</h3>' +
    '<p data-test-id="createdDate">{{createdAt}}</p>' +
    '<br>' +
    '<h3>Last updated at</h3>' +
    '<p data-test-id="lastUpdatedDate">{{lastUpdatedAt}}</p>',
})
export class ItemDetailsDialog {

  createdAt: Date = new Date(this.item.createdAt!);
  lastUpdatedAt: Date = new Date(this.item.lastUpdatedAt!);

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: Item) {
  }

}
