// @flow

import type { Node } from 'chrome-remote-interface-flowtype/src/types/dom';

export default class Document {
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
