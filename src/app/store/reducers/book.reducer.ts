import { Action } from '@ngrx/store';
import * as bookAction from '../actions/books';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../../models';

export interface State extends EntityState<Book>{
  selectedBookId:string|null,
  filterByTitle:string|null,
  filterByYear:string|null
}
export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: State = adapter.getInitialState({
  selectedBookId: null,
  filterByTitle:null,
  filterByYear:null
});

export function reducer(state = initialState, action: bookAction.Action) {
  switch (action.type) {
    case bookAction.ADD_BOOK: {
      return adapter.addOne(action.payload.book, state);    
    }  
    case bookAction.EDIT_BOOK: {
      return adapter.updateOne(action.payload.book, state);
      }
    case bookAction.DELETE_BOOK:{
      return adapter.removeOne(action.payload.id, state);
    }
    case bookAction.SET_FILTER_BY_BOOK_TITLE:{
      return {
        ...state,
        filterByTitle:action.payload.filterByTitle
      }
    }
    case bookAction.SET_FILTER_BY_BOOK_YEAR:{
      return {
        ...state,
        filterByTitle:action.payload.filterByYear
      }
    }
    case bookAction.SELECT:{
      return{
        ...state,
        selectedBookId:action.payload.id
      }
    }

    default:
      return state;
  }
}


export const getSelectedBookId = (state: State) => state.selectedBookId;

const {  selectEntities, selectAll } = adapter.getSelectors();
export const selectBookEntities = selectEntities;
export const selectAllBooks = selectAll;
