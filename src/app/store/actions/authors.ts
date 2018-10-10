import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity'
import { Author } from '../../models';

export const ADD_AUTHOR = '[Authors] Add author';
export const ADD_AUTHORS = '[Authors] Add authors';
export const EDIT_AUTHOR='[Authors] Edit author';
export const DELETE_AUTHOR='[Authors] Delete author';
export const GET_AUTHORS='[Authors] Get authors';



export class AddAuthor implements Action {
    readonly type = ADD_AUTHOR;

    constructor(public payload: {author:Author}) { }
}

export class AddAuthors implements Action {
    readonly type = ADD_AUTHORS;

    constructor(public payload: {authors: Author[]}){
        
    }
}

export class EditAuthor implements Action{
    readonly type=EDIT_AUTHOR;

    constructor(public payload: {id:number, author:Update<Author>}){}
}
export class DeleteAuthor implements Action{
    readonly type=DELETE_AUTHOR;

    constructor(public payload: {id:number}){}
}
export class GetAuthors implements Action{
    readonly type=GET_AUTHORS;

    constructor(public payload: {ids: number[]}){}
}
export type Action = GetAuthors | AddAuthor | EditAuthor | DeleteAuthor;