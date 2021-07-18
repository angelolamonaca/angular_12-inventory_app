import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Item} from '../store/item.model';
import {Store} from '@ngrx/store';
import {addItem} from "../store/item.actions";

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent {

  newItem: Item = {
    name: '',
    amount: 1
  }

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    private store: Store<Item>) {
  }

  addItem(): void {
    this.newItem.id = new Date().getTime()
    this.newItem.createdAt = new Date();
    this.newItem.lastUpdatedAt = new Date();
    this.store.dispatch(addItem({item: this.newItem}))
    this.dialogRef.close()
  }

}
