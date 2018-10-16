import { Action } from '@ngrx/store';
import * as bookAction from '../actions/books';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Book, Sort } from '../../models';

export interface State extends EntityState<Book> {
  selectedBookId: string | null,
  selectedSort: Sort
}
export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: State = adapter.getInitialState({
  selectedBookId: null,
  selectedSort: {
    name: null,
    order: null
  }
});

export function reducer(state = initialState, action: bookAction.Action) {
  switch (action.type) {
    case bookAction.ADD_BOOK: {
      return adapter.addOne(action.payload.book, state);
    }
    case bookAction.EDIT_BOOK: {
      return adapter.updateOne(action.payload.book, state);
    }
    case bookAction.DELETE_BOOK: {
      return adapter.removeOne(action.payload.id, state);
    }
    case bookAction.SET_SORT: {
      return {
        ...state,
        selectedSort: action.payload.sort
      }
    }
    case bookAction.SELECT: {
      return {
        ...state,
        selectedBookId: action.payload.id
      }
    }

    default:
      return state;
  }
}


export const getSelectedBookId = (state: State) => state.selectedBookId;

const { selectEntities, selectAll } = adapter.getSelectors();
export const selectBookEntities = selectEntities;
export const selectAllBooks = selectAll;
