import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity'
import { Book } from '../../models/book';
import { Sort } from '../../models/sort';
export const SELECT = '[Books] Select';
export const ADD_BOOK = '[Books] Add book';
export const LOAD_BOOKS = '[Books] Load books';
export const EDIT_BOOK = '[Books] Edit book';
export const DELETE_BOOK = '[Books] Delete book';

export const SET_SORT = '[Books] Set sort';


export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: { id: string }) { }
}

export class AddBook implements Action {
    readonly type = ADD_BOOK;

    constructor(public payload: { book: Book }) { }
}

export class LoadBooks implements Action {
    readonly type = LOAD_BOOKS;

    constructor() { }
}
export class EditBook implements Action {
    readonly type = EDIT_BOOK;

    constructor(public payload: { book: Update<Book> }) { }
}
export class DeleteBook implements Action {
    readonly type = DELETE_BOOK;

    constructor(public payload: { id: string }) { }
}
export class SetSort implements Action {
    readonly type = SET_SORT;
    constructor(public payload: { sort: Sort | null }) { }
}
export type Action = AddBook | Select | DeleteBook | EditBook | LoadBooks | SetSort;