import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models';
import { Store } from '@ngrx/store';
import * as fromRoot from './store/reducers/index';
import * as bookAction from './store/actions/books';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books$: Observable<Book[]>;
  selected$: Observable<Book>;

  constructor(private store: Store<fromRoot.State>, public dialog: MatDialog,
    ) {
    this.books$=this.store.select(fromRoot.selectAllBooks);
    this.selected$ = store.select(fromRoot.getSelectedBook);

  }
  onSelect(id: string) {
    this.store.dispatch(new bookAction.Select({ id:id }));
  }
  onAddBook(book:Book) {
    this.store.dispatch(new bookAction.AddBook({ 
      book:{
      ...book,
      id:UUID.UUID()
      } }));
  }
  openDialog() {
    let dialogRef = this.dialog.open(BookDialogComponent, {
      width: '550px',
      height: '800px',
      data: { title: "Добавление книги" }
    });
    const sub = dialogRef.componentInstance.onSave.subscribe((data: Book) => {
      this.onAddBook(data);
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
}

