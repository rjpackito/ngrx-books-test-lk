import {
    Component, OnInit, Input, OnChanges, Output,
    EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { Observable } from 'rxjs';
import { Book, Sort } from '../../models/index';
@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
    constructor() {

    }
    ngOnInit(): void { 
        this.sort=this.selectedSort
    }
    @Input() label: string;
    
    @Input() books: Book[];
    @Output() select = new EventEmitter();
    @Output() add=new EventEmitter();
    @Output() selectSort=new EventEmitter();
    @Input() selectedSort:Sort;
    sort:Sort=null;
    sortNull:Sort={name:null,order:null};

    sortByTitleAsc:Sort={name:'title',order:'asc'};
    sortByTitleDesc:Sort={name:'title',order:'desc'};
    sortByYearAsc:Sort={name:'year',order:'asc'};
    sortByYearDesc:Sort={name:'year',order:'desc'};
    compareObjects(o1: Sort, o2: Sort): boolean {
        return  o1.name === o2.name && o1.order === o2.order;
      }
}
