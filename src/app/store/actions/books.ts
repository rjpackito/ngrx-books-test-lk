import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity'
import { Book } from '../../models/book';

export const SELECT = '[Books] Select';
export const ADD_BOOK = '[Books] Add book';
export const LOAD_BOOKS='[Books] Load books';
export const EDIT_BOOK='[Books] Edit book';
export const DELETE_BOOK='[Books] Delete book';

export const SET_FILTER_BY_BOOK_TITLE='[Books] Set filter by book title';
export const SET_FILTER_BY_BOOK_YEAR='[Books] Set filter by book year';


export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: {id:string}) { }
}

export class AddBook implements Action {
    readonly type = ADD_BOOK;

    constructor(public payload: {book:Book}) { }
}

export class LoadBooks implements Action{
    readonly type=LOAD_BOOKS;

    constructor(){}
}
export class EditBook implements Action{
    readonly type=EDIT_BOOK;

    constructor(public payload: {book:Update<Book>}){}
}
export class DeleteBook implements Action{
    readonly type=DELETE_BOOK;

    constructor(public payload: {id:string}){}
}
export class SetFilterByBookTitle implements Action{
    readonly type=SET_FILTER_BY_BOOK_TITLE;
    constructor(public payload: {filterByTitle:string|null}){}
}
export class SetFilterByBookYear implements Action{
    readonly type=SET_FILTER_BY_BOOK_YEAR;
        constructor(public payload: {filterByYear:string|null}){}
    }
export type Action = AddBook | Select | DeleteBook | EditBook | LoadBooks | SetFilterByBookTitle | SetFilterByBookYear;