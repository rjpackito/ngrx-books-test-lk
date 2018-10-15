import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,MatDatepickerModule, DateAdapter,MAT_DATE_LOCALE,MAT_DATE_FORMATS
} from '@angular/material';
import {MatMomentDateModule,MomentDateAdapter,MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule ,ActionReducer,ActionReducerMap,MetaReducer} from '@ngrx/store';
import { reducers } from './store/reducers';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { BookSelectedComponent } from './components/book-selected/book-selected.component';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['books'],
    rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    BookDialogComponent,
    BookItemComponent,
    BookListComponent,
    BookSelectedComponent
  ],
  entryComponents: [
    BookDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    StoreModule.forRoot(reducers,{metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
