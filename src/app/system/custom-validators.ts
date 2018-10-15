import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import * as moment from 'moment';
const ISBN = require('isbn-validate');
const FORMAT_DATE = '01.01.1900';
export class CustomValidators {
  static dateMinimum(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value, FORMAT_DATE);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(date);

      return controlDate.isAfter(validationDate) ? null : {
        'date-minimum': {
          'date-minimum': validationDate.format(FORMAT_DATE),
          'actual': controlDate.format(FORMAT_DATE)
        }
      };
    };
  }
  static isbnValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return ISBN.Validate(control.value.replace(/[ \-]/g,'')) ? null : { custom: '' };
      }
    };
  }
}