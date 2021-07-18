import {Component, Inject, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";
import {Item} from '../store/item.model';

const items: Item[] = [
  {id: '1', name: 'iPhone 5', amount: 1, createdAt: new Date(), lastUpdatedAt: new Date("2014-02-28")},
  {id: '2', name: 'iPhone 6', amount: 2, createdAt: new Date(), lastUpdatedAt: new Date("2014-02-28")},
  {id: '3', name: 'iPhone 7', amount: 3, createdAt: new Date(), lastUpdatedAt: new Date("2014-02-28")},
  {id: '4', name: 'iPhone 8', amount: 4, createdAt: new Date(), lastUpdatedAt: new Date("2014-02-28")},
];

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})

export class InventoryTableComponent {

  constructor(public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['name', 'amount', 'createdAt', 'lastUpdatedAt'];
  dataSource = [...items];

  @ViewChild(MatTable) table!: MatTable<Item>;

  addItem() {
    const randomElementIndex = Math.floor(Math.random() * items.length);
    this.dataSource.push(items[randomElementIndex]);
    this.table.renderRows();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: items
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  removeItem() {
    this.dataSource.pop();
    this.table.renderRows();
  }

}
