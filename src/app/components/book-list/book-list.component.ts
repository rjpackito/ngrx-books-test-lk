import {
    Component, OnInit, Input, OnChanges, Output,
    EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { Observable } from 'rxjs';
import { Book } from '../../models/index';
@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
    constructor() {

    }
    ngOnInit(): void { }
    @Input() label: string;

    @Input() books: Book[];
    @Output() select = new EventEmitter();
}
