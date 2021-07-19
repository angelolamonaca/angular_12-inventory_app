import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory-app';
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['custom-snackbar']
    });
    snackBarRef.onAction().subscribe(() => {
      window.open("https://github.com/angelolamonaca/coding-challenge", "_blank");
    });
  }

}

