// @flow

import cherrio from 'cheerio';

import Chaldeas from 'chaldeas';
import Document from './document';

export default class TriHermes {
  chaldeas: Chaldeas;
  url: string;
  doc: Document;

  constructor(chaldeas: Chaldeas) {
    this.chaldeas = chaldeas;
  }

  async load(): Promise<> {
    const devTools = await this.chaldeas.getDevtoolsInterface();
    const page = await devTools.PageDomain();

    await page.navigate({ url: this.url });

    return new Promise((resolve) => {
      page.domContentEventFired(async () => {
        const dom = await devTools.DOMDomain();
        const rootNode = await dom.getDocument();

        this.doc = new Document(dom, rootNode.root);

        resolve();
      });
    }).catch(e => this.chaldeas.terminate().then(() => {
      throw e;
    }));
  }

  async querySelector(query: string) {
    const results = await this.doc.querySelector(query);
    return results.map(html => cherrio.load(html));
  }
}
