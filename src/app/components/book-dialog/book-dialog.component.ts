import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-book-dialog',
    templateUrl: './book-dialog.component.html',
    styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {
    public bookForm: FormGroup;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _fb: FormBuilder) { }

    ngOnInit(): void {
        this.initForm();
    }
    initForm() {
        this.bookForm = this._fb.group({
            title: ['',[Validators.required,Validators.maxLength(30)]],
            authors: this._fb.array([]),
            countOfPages: [null,[Validators.required,Validators.min(1),Validators.max(10000)]],
            publisherName: [''],
            year: [null],
            releaseDate: [null],
            isbn: [''],
            picture: [null]
        });
    }
}

