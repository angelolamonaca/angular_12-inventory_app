import {Component, Inject, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";

export interface item {
  name: string;
  amount: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}

const items: item[] = [
  {name: 'iPhone 5', amount: 1, createdAt: new Date(), lastUpdatedAt: new Date("2014-02-28")},
  {name: 'iPhone 6', amount: 2, createdAt: new Date(), lastUpdatedAt: new Date("2014-02-28")},
  {name: 'iPhone 7', amount: 3, createdAt: new Date(), lastUpdatedAt: new Date("2014-02-28")},
  {name: 'iPhone 8', amount: 4, createdAt: new Date(), lastUpdatedAt: new Date("2014-02-28")},
];

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})

export class InventoryTableComponent {

  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['name', 'amount', 'createdAt', 'lastUpdatedAt'];
  dataSource = [...items];

  @ViewChild(MatTable) table!: MatTable<item>;

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
