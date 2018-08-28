import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  // get all values of the formGroup, loop over them
  // then mark each field as touched
  // public markFormGroupTouched(formGroup: FormGroup) {
  //   Object.values(formGroup.controls).forEach(control => {
  //     control.markAsTouched();

  //     if (control.controls) {
  //       control.controls.forEach(c => this.markFormGroupTouched(c));
  //     }
  //   });
  // }

  // return list of error messages
  public validationMessages() {
    const messages = {
      required: 'This field is required',
      email: 'This email address is invalid',
      minlength: 'The password must be at least 6 characters',
      invalid_characters: (matches: any[]) => {

        let matchedCharacters = matches;

        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;

          if(/\s/.test(character))
            character = 'whitespace';
            
          string += character;

          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }

          return string;
        }, '');

        return `These characters are not allowed: ${matchedCharacters}`;
      },
      invalid_password: (errors: any[]) => {
        return errors.join('\n');
      }
    };

    return messages;
  }

  // Validate form instance
  // check_dirty true will only emit errors if the field is touched
  // check_dirty false will check all fields independent of
  // being touched or not. Use this as the last check before submitting
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);

        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && ['invalid_characters','invalid_password'].indexOf(key) === -1) {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return formErrors;
  }


  public forbiddenCharacters(control: FormControl) {
    const validCharacters = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/; // /[^\s\w,.:&\/()+%'`@-]/;
    // first check if the control has a value
    if (control.value && control.value.length > 0) {

      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);

      // if there are matches return an object, else return null.
      return matches && matches.length ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }


  public validatePassword(control: FormControl) {
    const lowerCase = /(?=.*[a-z])/;
    const upperCase = /(?=.*[A-Z])/;
    const numericValue = /(?=.*[0-9])	/;
    const specialChar = /(?=.[!@#\$%\^&*-_])/;
    let errors = [];
    const passwordMessages = [
      'The password must contain at least 1 lowercase alphabetical character',
      'The password must contain at least 1 uppercase alphabetical character',
      'The password must contain at least 1 numeric character',
      'The password must contain at least one special character (!@#$%^&*-_)'
    ];
    

    if (control.value && control.value.length > 0) {

      // match the control value against the regular expression
      const lowerCaseMatches = control.value.match(lowerCase);
      const upperCaseMatches = control.value.match(upperCase);
      const numericValueMatches = control.value.match(numericValue);
      const specialCharMatches = control.value.match(specialChar);

      if(lowerCaseMatches == null) { errors.push(passwordMessages[0]) }
      if(upperCaseMatches == null) { errors.push(passwordMessages[1]) }
      if(numericValueMatches == null) { errors.push(passwordMessages[2]) }
      if(specialCharMatches == null) { errors.push(passwordMessages[3]) }

      // if there are matches return an object, else return null.
      return errors && errors.length ? { invalid_password: errors } : null;
    } else {
      return null;
    }
  }


}