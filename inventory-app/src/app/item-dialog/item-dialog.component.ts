import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Store} from '@ngrx/store';
import {Item} from '../store/item.model';
import {addItem} from "../store/item.actions";

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})

/**
 * @author angelo.lamonaca@gmail.com
 *
 */

export class ItemDialogComponent {

  newItem: Item = {
    name: '',
    amount: 1
  }

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    private store: Store<Item>) {
  }

  /**
   * Insert the item in the store
   * (id is set using number of milliseconds since 1 January 1970)
   * (createdAt and lastUpdatedAt Date are set using a string in simplified extended
   * ISO format (ISO 8601) to avoid different recordings on different timelines based on the local timezone)
   *
   */
  addItem(): void {
    this.newItem.id = new Date().getTime()
    this.newItem.createdAt = new Date().toISOString()
    this.newItem.lastUpdatedAt = new Date().toISOString()
    this.store.dispatch(addItem({item: this.newItem}))
    this.dialogRef.close()
  }

}
