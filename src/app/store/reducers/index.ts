import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromBook from './book.reducer';
  
  export interface State {
    users: fromBook.State;
  }
  
  export const reducers: ActionReducerMap<State> = {
    users: fromBook.reducer,
  };
  
  export const selectBookState = createFeatureSelector<fromBook.State>('books');
  
  
  export const selectBookEntities = createSelector(
    selectBookState,
    fromBook.selectBookEntities
  );
  export const selectAllBooks = createSelector(
    selectBookState,
    fromBook.selectAllBooks
  );
  
  export const selectCurrentBookId = createSelector(
    selectBookState,
    fromBook.getSelectedUserId
  );
  
  export const selectCurrentBook = createSelector(
    selectBookState,
    selectCurrentBookId,
    (bookEntities, bookId) => bookEntities[bookId]
  );