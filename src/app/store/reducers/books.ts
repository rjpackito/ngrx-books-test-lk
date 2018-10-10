import { Action } from '@ngrx/store';
import * as bookAction from '../actions/books';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../../models';


export interface State {
  ids: number[];
  books: { [id: number]: Book };
  selected: number;
  filterByTitle:number;
  filterByYear:number;
}

export const initialState: State = {
  ids: [],
  books: {},
  selected: null,
  filterByTitle:null,
  filterByYear:null
};

export function reducer(state = initialState, action: bookAction.Action) {
  switch (action.type) {
    case bookAction.ADD_BOOK: {
      const newBook: Book = action.payload.book;

      return {
        ...state,
        ids: [...state.ids, newBook.id],
        books: { ...state.books, newBook }
      };
    }


    case bookAction.SELECT: {
      const id = action.payload.id;
      return {
        ...state,
        selected: id
      };
    }

    case bookAction.EDIT_BOOK: {
        const book = action.payload.book;
        return {
          ...state,
        };
      }

    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getBooks= (state: State) => state.books;
export const getSelected = (state: State) => state.selected;