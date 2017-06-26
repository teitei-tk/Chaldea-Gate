# TriHermes

Page Object Model using Chrome Headless Browser


## Example

```JavaScript
// @flow

import TriHermes from 'triHermes';

class MyGithubRepositories extends TriHermes.Page {
  url = "https://github.com/teitei-tk?tab=repositories"

  titles() {
    // do something
  }
}

const instance = new MyGithubPage();
console.log(instance.titles()); // [TriHermes, Chaldeas...]
```
