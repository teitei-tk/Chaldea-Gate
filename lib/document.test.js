// @flow

import Chaldeas from 'chaldeas';
import TriHermes from './triHelmes';

class GithubPage extends TriHermes {
  url = 'https://github.com/teitei-tk'
}

async function main() {
  const chaldeas = Chaldeas.new();
  const page = new GithubPage(chaldeas);

  await page.load();

  const result = await page.querySelector('.repo');
  console.log(result.map(r => r.text()));

  chaldeas.terminate();
}

process.on('unhandledRejection', console.dir);

main();
