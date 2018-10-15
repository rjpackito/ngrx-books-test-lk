import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models';
import * as moment from 'moment';

@Component({
  selector: 'app-book-selected',  
  templateUrl: './book-selected.component.html',
  styleUrls: ['./book-selected.component.scss'],
  
})
export class BookSelectedComponent implements OnInit {
  @Input() book: Book;
  publisherDateStr:string;
  constructor() { }

  ngOnInit() {
     this.publisherDateStr=this.book.releaseDate?moment(this.book.releaseDate).format('DD.MM.YYYY'):'';
  }
  
}