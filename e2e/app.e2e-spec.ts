import { BeerinoPage } from './app.po';

describe('beerino App', function() {
  let page: BeerinoPage;

  beforeEach(() => {
    page = new BeerinoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
