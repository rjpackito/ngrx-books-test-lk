import { Component, OnInit, Inject, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { CustomValidators } from "src/app/system/custom-validators";

@Component({
  selector: "app-book-dialog",
  templateUrl: "./book-dialog.component.html",
  styleUrls: ["./book-dialog.component.scss"]
})
export class BookDialogComponent implements OnInit {
  public bookForm: FormGroup;
  @ViewChild("file") file:ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }
  @Output()
  onSave = new EventEmitter<any>(true);

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.bookForm = this._fb.group({
      title: ["", [Validators.required, Validators.maxLength(30)]],
      authors: this._fb.array(
        [this.initFormAuthor()],
        [Validators.required, Validators.minLength(1)]
      ),
      countOfPages: [
        null,
        [Validators.required, Validators.min(1), Validators.max(10000)]
      ],
      publisherName: ["", Validators.maxLength(30)],
      year: [null, Validators.min(1800)],
      releaseDate: [null, CustomValidators.dateMinimum('01.01.1800')],
      isbn: ["", CustomValidators.isbnValidator()],
      picture: this._fb.group({
        content: null,
        type: null,
        name: null
      })
    });
  }
  initFormAuthor() {
    return this._fb.group({
      firstname: ["", [Validators.required, Validators.maxLength(20)]],
      surname: ["", [Validators.required, Validators.maxLength(20)]]
    });
  }
  addAuthor() {
    (this.bookForm.controls["authors"] as FormArray).push(
      this.initFormAuthor()
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
  openSelectFile(){
    this.file.nativeElement.click();
  }
}
