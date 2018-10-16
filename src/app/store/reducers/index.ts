import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromBook from './book.reducer';

export interface State {
  books: fromBook.State;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBook.reducer,
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
  fromBook.getSelectedBookId
);

export const getSelectedBook = createSelector(
  selectBookEntities,
  selectCurrentBookId,
  (bookEntities, bookId) =>
    bookEntities[bookId]
);

export const selectSelectedSort = createSelector(
  selectBookState,
  (selectBookState) =>
    selectBookState.selectedSort
);

const getSortedKeysAsArray = createSelector(
  selectAllBooks,
  selectSelectedSort,
  (entityArray, sortProps) => {
    return sort(entityArray.slice(), sortProps);
  });

export const getSortedArray = createSelector(
  selectBookEntities,
  getSortedKeysAsArray,
  (entities, sortedKeys) => {
    return sortedKeys.map(id => entities[id]);
  })
const compareFn = function (sortProps, a, b) {
  if (a[sortProps.name] > b[sortProps.name])
    return 1;
  if (a[sortProps.name] > b[sortProps.name])
    return 1;
  return 0;
}
const sort = function (entities, props) {
  let sortedArr =  entities.slice()
    .sort(compareFn.bind(null, props))
    .map(entity => entity.id) ;
  if (props.order && props.order == 'desc')
    return sortedArr.reverse();
  else return sortedArr;
}