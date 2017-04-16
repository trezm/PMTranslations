const functions = require('firebase-functions');
const translate = require('@google-cloud/translate')();

const request = require('request-promise');
const levenshtein = require('fast-levenshtein');

const constants = require('./constants');

exports.translate = functions.database.ref('/en/{pushId}/value')
  .onWrite((event) => {
    const english = event.data.val();

    /**
     * "Smartmatch"
     */
    if (event.data.previous.exists() &&
      event.data.previous.val === english) {
      return;
    }

    return _authMS()
      .then((authKey) => {
        return Promise.all(constants.ALLOWED_LANGUAGES.map((language) => {
          let googleResult;
          let msResult;
          return _translateGoogle(english, language)
            .then((result) => googleResult = result)
            .then(() => _translateMS(english, language, authKey))
            .then((result) => msResult = result)
            .then(() => event.data.ref.root.child(`/${language}/${event.params.pushId}/value`).set(googleResult))
            .then(() => event.data.ref.root.child(`/${language}/${event.params.pushId}/metadata/levenshtein`).set(levenshtein.get(googleResult, msResult)))
            .then(() => event.data.ref.root.child(`/${language}/${event.params.pushId}/metadata/google`).set(googleResult))
            .then(() => event.data.ref.root.child(`/${language}/${event.params.pushId}/metadata/msResult`).set(msResult))
        }))
      })
      .catch((err) => console.log('err:', err));
  });

function _translateGoogle(from, to) {
  return new Promise((resolve, reject) => {
    translate.translate(from, to, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
      // event.data.ref.root.child(`/${language}/${event.params.pushId}`).set(result)
    });
  })
}

function _authMS() {
  return request({
    url: `https://api.cognitive.microsoft.com/sts/v1.0/issueToken`,
    headers: {
      'Ocp-Apim-Subscription-Key': functions.config().ms.key
    },
    method: 'POST'
  })
}

function _translateMS(from, to, authKey) {
  return request({
    url: `https://api.microsofttranslator.com/V2/Http.svc/Translate?text=${from}&to=${to}`,
    headers: {
      'Authorization': `Bearer ${authKey}`
    }
  })
  .then((result) => result.replace(/<string [^>]*>/g, '').replace(/<\/string>/g, '').trim());
}
