import { Component, OnInit, Inject, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { CustomValidators } from "src/app/system/custom-validators";
import { Book, Author } from "src/app/models";

@Component({
  selector: "app-book-dialog",
  templateUrl: "./book-dialog.component.html",
  styleUrls: ["./book-dialog.component.scss"]
})
export class BookDialogComponent implements OnInit {
  public bookForm: FormGroup;
  @ViewChild("file") file: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
  }
  @Output()
  onSave = new EventEmitter<any>(true);

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.bookForm = this._fb.group({
      id:[!this.data.book ? "":this.data.book.id],
      title: [!this.data.book ? "" : this.data.book.title, [Validators.required, Validators.maxLength(30)]],
      authors: this._fb.array(
        !this.data.book ? [this.initFormAuthor(null)] : (this.data.book as Book).authors.map(element =>
          this.initFormAuthor(element)
        ),
        [Validators.required, Validators.minLength(1)]
      ),
      countOfPages: [
        !this.data.book ? null : this.data.book.countOfPages,
        [Validators.required, Validators.min(1), Validators.max(10000)]
      ],
      publisherName: [!this.data.book ? "" : this.data.book.publisherName, Validators.maxLength(30)],
      year: [!this.data.book ? null : this.data.book.year, Validators.min(1800)],
      releaseDate: [!this.data.book ? null : this.data.book.releaseDate, CustomValidators.dateMinimum('01.01.1800')],
      isbn: [!this.data.book ? "" : this.data.book.isbn, CustomValidators.isbnValidator()],
      picture: this._fb.group({
        content: !this.data.book ? null : this.data.book.picture.content,
        type: !this.data.book ? null : this.data.book.picture.type,
        name: !this.data.book ? null : this.data.book.picture.name
      })
    });
  }
  initFormAuthor(author: Author) {
    debugger;
    return this._fb.group({
      firstname: [!author ? "" : author.firstname, [Validators.required, Validators.maxLength(20)]],
      surname: [!author ? "" : author.surname, [Validators.required, Validators.maxLength(20)]]
    });
  }
  addAuthor() {
    (this.bookForm.controls["authors"] as FormArray).push(
      this.initFormAuthor(null)
    );
  }
  public removeAuthor(index) {
    (this.bookForm.controls["authors"] as FormArray).removeAt(index);
  }
  saveBook() {
    if (this.bookForm.valid) this.onSave.emit(this.bookForm.value);
    
  }
  handleFileSelect(event) {
    let files = event.target.files;
    let file = files.item(0);

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);

      (this.bookForm.controls['picture'] as FormGroup).patchValue({

        type: file.type,
        name: file.name
      });
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    (this.bookForm.controls['picture'] as FormGroup).patchValue({
      content: btoa(binaryString)
    });
  }
  openSelectFile() {
    this.file.nativeElement.click();
  }
}
