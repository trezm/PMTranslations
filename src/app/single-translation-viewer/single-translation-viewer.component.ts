import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { ALLOWED_LANGUAGES } from '../../../functions/constants';

@Component({
  selector: 'pm-single-translation-viewer',
  templateUrl: './single-translation-viewer.component.html',
  styleUrls: ['./single-translation-viewer.component.scss']
})
export class SingleTranslationViewerComponent implements OnInit {
  key: string;
  translations: Observable<any>;
  localTranslations: any = {};
  languageArray = ALLOWED_LANGUAGES;
  hasTranslations: boolean = false;

  constructor(private _af: AngularFire) { }

  ngOnInit() {
  }

  getTranslation(key: string) {
    this.localTranslations = {};

    this.translations = Observable.combineLatest(ALLOWED_LANGUAGES.map((language) => this._af.database.object(`/${language}/${key.replace(/\./g, ':')}`)));

    this.translations.subscribe((value) => {
      const hits = value && value.map((data, index) => {
        return {
          language: this.languageArray[index],
          data: data
        }
      });

      this.hasTranslations = hits && hits.length > 0;

      hits && hits.forEach((val) => this.localTranslations[val.language] = val.data);
    });

    return false;
  }

  saveTranslations() {
    Observable.combineLatest(ALLOWED_LANGUAGES.map((language) => {
        return this._af.database.object(`/${language}/${this.key.replace(/\./g, ':')}/value`).set(this.localTranslations[language]);
      }))
      .subscribe(() => {
        this.localTranslations = {};
        this.key = undefined;
        this.hasTranslations = false;
      });

    return false;
  }
}
