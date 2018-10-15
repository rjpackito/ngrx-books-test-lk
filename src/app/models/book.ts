import {Author} from './author';
import { Picture } from './picture';
export interface Book{
    id:string;
    title:string;
    authors: Array<Author>;
    countOfPages:number;
    publisherName:string;
    year:number;
    releaseDate:Date;
    isbn:string;
    picture:Picture;
}