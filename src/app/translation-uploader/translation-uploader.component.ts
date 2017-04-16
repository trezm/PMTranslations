import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

enum AvailableInterfaces {
    SingleKeyValue,
    JSON
};

/**
 * Yes I copied this from stack overflow, no I didn't want to write it myself, no I will not include lodash for a single function.
 */
function flatten(data) {
  var result = {};
  function recurse (cur, prop) {
      if (Object(cur) !== cur) {
          result[prop] = cur;
      } else if (Array.isArray(cur)) {
            for(var i=0, l=cur.length; i<l; i++)
                recurse(cur[i], prop + "[" + i + "]");
          if (l == 0)
              result[prop] = [];
      } else {
          var isEmpty = true;
          for (var p in cur) {
              isEmpty = false;
              recurse(cur[p], prop ? prop+"."+p : p);
          }
          if (isEmpty && prop)
              result[prop] = {};
      }
  }
  recurse(data, "");
  return result;
}

@Component({
  selector: 'pm-translation-uploader',
  templateUrl: './translation-uploader.component.html',
  styleUrls: ['./translation-uploader.component.scss']
})
export class TranslationUploaderComponent implements OnInit {
  public key: string;
  public value: string;
  public AvailableInterfaces = AvailableInterfaces;
  public currentInterface: AvailableInterfaces = AvailableInterfaces.SingleKeyValue;

  constructor(private af: AngularFire) { }

  ngOnInit() {
  }

  _addSingleTranslation(key: string, value: string) {
    const ref = this.af.database.object(`/en/${key.replace(/\./g, ':')}/value`);

    ref.set(value);
  }

  _flattenJSON(value: Object) {
    return flatten(value);
  }

  addTranslation(key: string, value: string) {
    if (this.currentInterface === this.AvailableInterfaces.SingleKeyValue) { this._addSingleTranslation(key, value) };
    if (this.currentInterface === this.AvailableInterfaces.JSON) {
      try {
        const flattened = this._flattenJSON(JSON.parse(value));

        Object.keys(flattened)
          .forEach((key) => this._addSingleTranslation(key, flattened[key]));
      } catch (e) {

      }
    }

    this.key = undefined;
    this.value = undefined;

    return false;
  }

  switchInterfaces() {
    this.currentInterface = (this.currentInterface + 1) % 2;
  }
}
