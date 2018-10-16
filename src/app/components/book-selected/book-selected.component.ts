import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../../models';
import * as moment from 'moment';

@Component({
  selector: 'app-book-selected',
  templateUrl: './book-selected.component.html',
  styleUrls: ['./book-selected.component.scss'],

})
export class BookSelectedComponent implements OnInit {
  @Input() book: Book;
  publisherDateStr: string;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.publisherDateStr = this.book.releaseDate ? moment(this.book.releaseDate).format('DD.MM.YYYY') : '';
  }

}