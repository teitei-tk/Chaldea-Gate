// @flow

import Chaldeas from 'chaldeas';
import TriHermes from './../triHelmes';

class GithubPage extends TriHermes {
  url = 'https://github.com/teitei-tk'

  async getAccountTitle(): Promise<string> {
    const title = await this.querySelector('title');
    return title.text();
  }

  async getPinnedRepoNames(): Promise<Array<string>> {
    const results = await this.querySelectorAll('.repo');
    return results.map(r => r.text());
  }
}

describe('TriHermes', () => {
  let chaldeas;

  beforeAll(() => {
    chaldeas = Chaldeas.new();
  });

  afterAll(() => {
    chaldeas.terminate();
  });

  describe('querySelector', () => {
    let page;

    beforeEach(async () => {
      page = new GithubPage(chaldeas);
      await page.load();
    });

    test('when page title is teitei-tk (teitei-tk)', async () => {
      const title = await page.getAccountTitle();
      expect(title).toBe('teitei-tk (teitei-tk) · GitHub');
    });

    test('when my github account pinned repository count', async () => {
      const repoNames = await page.getPinnedRepoNames();
      expect(repoNames.length).toBe(6);
    });
  });
});
