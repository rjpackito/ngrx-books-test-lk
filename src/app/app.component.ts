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
    this.books$ = this.store.select(fromRoot.selectAllBooks);
    this.selected$ = this.store.select(fromRoot.getSelectedBook);

  }
  onSelect(id: string) {
    this.store.dispatch(new bookAction.Select({ id: id }));
  }
  onAddBook(book: Book) {
    this.store.dispatch(new bookAction.AddBook({
      book: {
        ...book,
        id: UUID.UUID()
      }
    }));
  }
  onEditBook(book: Book) {
    debugger;
    this.store.dispatch(new bookAction.EditBook({
      book: {
        id: book.id,
        changes: book,
      }
    })
    );
  }
  onOpenEditBook(book:Book) {
    this.openDialog(false,book);
  }
  onOpenAddBook(){
    this.openDialog(true,null);
  }
  openDialog(isAdd: boolean,book:Book) {
    let dialogRef = this.dialog.open(BookDialogComponent, {
      width: '550px',
      height: '800px',
      data: isAdd ?
        {
          title: "Добавление книги"
        } :
        {
          title: "Редактирование книги",
          book: book
        }
    }
    );
    const sub = dialogRef.componentInstance.onSave.subscribe((data: Book) => {
      isAdd ? this.onAddBook(data) : this.onEditBook(data);
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
  onDelete(id: string) {
    this.store.dispatch(new bookAction.DeleteBook({ id: id }));
    this.store.dispatch(new bookAction.Select({ id: null }));
  }
}

