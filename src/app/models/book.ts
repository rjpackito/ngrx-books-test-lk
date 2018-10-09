import {Author} from './author';
export interface Book{
    id:number;
    title:string;
    authors: Array<Author>;
    countOfPages:number;
    publisherName:string;
    year:number;
    releaseDate:Date;
    isbn:string;
    picture:string;
}