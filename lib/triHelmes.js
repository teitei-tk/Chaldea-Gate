// @flow

import Cheerio from 'cheerio';

import Chaldeas from 'chaldeas';
import Document from './document';

export default class TriHermes {
  chaldeas: Chaldeas;
  url: string;
  doc: Document;

  constructor(chaldeas: Chaldeas) {
    this.chaldeas = chaldeas;
  }

  static parse(html: string): Cheerio {
    return Cheerio.load(html);
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

  async querySelectorAll(query: string): Promise<Array<any>> {
    const results = await this.doc.querySelectorAll(query);
    return results.map(html => TriHermes.parse(html));
  }

  async querySelector(query: string): Promise<any> {
    const result = await this.doc.querySelector(query);
    if (result === null) {
      return null;
    }

    return TriHermes.parse((result || ''));
  }
}
