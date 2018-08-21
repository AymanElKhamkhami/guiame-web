import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-verified-user',
  templateUrl: './verified-user.component.html',
  styleUrls: ['./verified-user.component.css']
})
export class VerifiedUserComponent implements OnInit {

  valid: boolean;
  invalid: boolean;
  expired: boolean;

  constructor(private _route: ActivatedRoute) { 
  }

  ngOnInit() {

    let actionCode: string = this._route.snapshot.queryParamMap.get('oobCode');
    let me = this;
    
    firebase.auth().applyActionCode(actionCode)
    .then(function (res) {
      console.log(res);
      me.valid = true;
    })
    .catch(function (err) {
      console.log(err);
      me.expired = true;
    });

  }

}
