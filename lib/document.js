// @flow

import type { Node } from 'chrome-remote-interface-flowtype/src/types/dom';
import type { DOM, Runtime } from 'chrome-remote-interface-flowtype';

export class Document {
  runtime: Runtime;
  dom: DOM;
  nodes: Array<Node>;

  constructor(dom: DOM, runtime: Runtime, nodes: Array<Node>) {
    this.dom = dom;
    this.runtime = runtime;
    this.nodes = nodes;
  }

  async querySelector(query: string) {
    const searchResult = await this.dom.performSearch({ query });

    const nodeIds = (await this.dom.getSearchResults({
      searchId: searchResult.searchId,
      fromIndex: 0,
      toIndex: searchResult.resultCount,
    })).nodeIds;

    const remoteObjects = nodeIds.map(async (nodeId) => {
      const remoteObj = await this.dom.resolveNode({ nodeId });
      return remoteObj;
      /*
      const prop = await this.runtime.getProperties({
        objectId: (remoteObj.object.objectId || ''),
      });

      return prop;
      */
    });

    return Promise.all(remoteObjects);
  }
}

export default class RawDocument {
  nodes: Array<Node>;

  constructor(nodes: Array<Node>) {
    this.nodes = nodes;
  }

  getNodesByNodeName(name: string): Array<Node> {
    return this.nodes.filter(node => node.nodeName.toLowerCase() === name);
  }

  getNodesByClassName(name: string): Array<Node> {
    const nodes: Array<Node> = [];

    this.nodes.forEach((node) => {
      const attrValue = Document.getAttribute(node, 'class');
      if (attrValue === null) {
        return;
      }

      const classAttr = (attrValue || '').split(' ');
      if (classAttr.length <= 0 || !classAttr.includes(name)) {
        return;
      }

      nodes.push(node);
    });

    return nodes;
  }

  static hasAttribute(node: Node, key: string): boolean {
    if (!node.attributes) {
      return false;
    }
    return node.attributes.includes(key);
  }

  static getAttributeValueIndex(attr?: Array<string>, key: string): number {
    const attrIndex = (attr || []).findIndex(v => v === key);
    if (attrIndex === -1) {
      return -1;
    }

    return attrIndex + 1;
  }

  static getAttribute(node: Node, key: string): ?string {
    if (!node.attributes || !Document.hasAttribute(node, key)) {
      return null;
    }

    const index = Document.getAttributeValueIndex(node.attributes, key);
    if (index === -1) {
      return null;
    }

    return (node.attributes && node.attributes[index]);
  }
}
