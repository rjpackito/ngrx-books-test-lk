import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models';
import { Store } from '@ngrx/store';
import * as fromRoot from './store/reducers/index';
import * as bookAction from './store/actions/books';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books$: Observable<Book[]>;

  constructor(private store: Store<fromRoot.State>,public dialog: MatDialog) {
    this.store.select(fromRoot.selectAllBooks)
  }
  onSelect(id: number) {
    this.store.dispatch(new bookAction.Select({id:id}));
  }
  openDialog() {
    this.dialog.open(BookDialogComponent,{
      width: '450px',
      height:'500px',
      data: {title: "Добавление книги"}
    });
  }
}

