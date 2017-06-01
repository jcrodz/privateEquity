import { PrivateEquityFirmPage } from './app.po';

describe('private-equity-firm App', () => {
  let page: PrivateEquityFirmPage;

  beforeEach(() => {
    page = new PrivateEquityFirmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
