# TriHermes

Page Object Model using Chrome Headless Browser


## Example

```JavaScript
// @flow

import Chaldeas from 'chaldeas'
import TriHermes from 'triHermes';

class MyGithubRepositories extends TriHermes {
  url = "https://github.com/teitei-tk?tab=repositories"

  titles() {
    // do something
  }
}

// chrome accessor class
const chaldeas = Chaldeas.new();
const repoPage = new MyGithubPage(chaldeas);

// fetch class url at https://github.com/teitei-tk?tab=repositories
repoPage.load()

// get repository names
console.log(repoPage.titles()); // [TriHermes, Chaldeas...]

// terminate chrome headless.
chaldeas.terminate();
```
