import { TurnBasedAdventurePage } from './app.po';

describe('turn-based-adventure App', () => {
  let page: TurnBasedAdventurePage;

  beforeEach(() => {
    page = new TurnBasedAdventurePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
