import { Component, OnInit } from '@angular/core';
import {
  AngularFireAuth,
  AuthMethods,
  AuthProviders
} from 'angularfire2';

@Component({
  selector: 'pm-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public title: string = 'PMTranslations';

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  signIn() {
    this.afAuth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }
}
