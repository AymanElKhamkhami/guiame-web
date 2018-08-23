import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {

  title;
  message;

  constructor(private _dialogRef: MatDialogRef<PromptComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    switch(this.data.promptType) {
      case 'emailSent':
        this.title ='A verification link has been sent to your email account';
        this.message = 'Please click on the link that has just been sent to your email account to verify your email and continue the registration perocess.'
        break;
      default:
        //TODO: close dialog
        break;
    }
  }

  ngOnInit() {
  }

}
