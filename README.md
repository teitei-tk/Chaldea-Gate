# TriHermes

Page Object Model using Chrome Headless Browser


## Example

```JavaScript
// @flow

import type { Node } from 'chrome-remote-interface-flowtype/src/types/dom';

import Chaldeas from 'chaldeas';
import TriHermes from '../lib';
import Document from '../lib/document';

class GithubPage extends TriHermes {
  url = 'https://github.com/teitei-tk';

  getPinnedRepos(): Array<Node> {
    return this.doc.getNodesByClassName('repo');
  }

  getPinnedReposName(): Array<string> {
    const reposName = [];
    this.getPinnedRepos().forEach((node) => {
      const title = Document.getAttribute(node, 'title');
      if (!title || title === null) {
        return;
      }

      reposName.push(title);
    });

    return reposName;
  }
}

async function main() {
  const chaldeas = Chaldeas.new();
  const page = new GithubPage(chaldeas);

  await page.load();

  const reposName = page.getPinnedReposName();
  console.log(reposName);

  await chaldeas.terminate();
}

main();
```
