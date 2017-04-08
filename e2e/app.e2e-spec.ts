import { CircleTranslationsPage } from './app.po';

describe('circle-translations App', () => {
  let page: CircleTranslationsPage;

  beforeEach(() => {
    page = new CircleTranslationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ys works!');
  });
});
