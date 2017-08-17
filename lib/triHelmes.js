// @flow

import Chaldeas from 'chaldeas';

import RawDocument, { Document } from './document';

export default class TriHermes {
  chaldeas: Chaldeas;
  url: string;
  doc: RawDocument;
  newDoc: Document;

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
        const nodes = (await dom.getFlattenedDocument()).nodes;
        const runtime = await devTools.RuntimeDomain();

        await runtime.enable();

        this.doc = new RawDocument(nodes);
        this.newDoc = new Document(dom, runtime, nodes);

        resolve();
      });
    }).catch(e => this.chaldeas.terminate().then(() => {
      throw e;
    }));
  }
}
