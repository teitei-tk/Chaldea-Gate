// @flow

import type { Node } from 'chrome-remote-interface-flowtype/src/types/dom';
import type { DOM } from 'chrome-remote-interface-flowtype';

export default class Document {
  dom: DOM;
  rootNode: Node;

  constructor(dom: DOM, rootNode: Node) {
    this.dom = dom;
    this.rootNode = rootNode;
  }

  async querySelector(query: string): Promise<?string> {
    const results = await this.querySelectorAll(query);
    if (results.length <= 0) {
      return null;
    }

    return results[0];
  }

  async querySelectorAll(query: string): Promise<Array<string>> {
    const searchResult = await this.dom.performSearch({ query });

    const nodeIds = (await this.dom.getSearchResults({
      searchId: searchResult.searchId,
      fromIndex: 0,
      toIndex: searchResult.resultCount,
    })).nodeIds;

    const htmls = nodeIds.map(async (nodeId) => {
      const html = await this.dom.getOuterHTML({ nodeId });
      return html.outerHTML;
    });

    return Promise.all(htmls);
  }
}
