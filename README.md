# TriHermes

[![CircleCI](https://circleci.com/gh/teitei-tk/TriHermes.svg?style=svg)](https://circleci.com/gh/teitei-tk/TriHermes)

Page Object Model using Chrome Headless Browser

## Dependencies

* Node.js 6.10 or later
* chaldeas ^0.1.2
* cheerio ^1.0.0-rc.2
* chrome-remote-interface-flowtype ^0.1.3

## Example

```JavaScript
// @flow

import Chaldeas from 'chaldeas';
import TriHermes from 'triHermes'

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

async function main() {
  const chaldeas = Chaldeas.new();
  const page = new GithubPage(chaldeas);

  await page.load();

  const reposName = page.getPinnedReposName();
  console.log(reposName); // [ 'Chaldeas', 'chrome-remote-interface-flowtype', 'Marguerite', 'Simple-AES-Cipher', 'gattaca', 'malwiya' ]

  await chaldeas.terminate();
}

main();
```
