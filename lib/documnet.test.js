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

  const r = await page.newDoc.querySelector('.repo');
  console.log(r);

  chaldeas.terminate();
}

process.on('unhandledRejection', console.dir);

main();
