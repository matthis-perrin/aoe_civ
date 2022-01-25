import {HTMLElement, Node, NodeType, parse} from 'node-html-parser';

import {createDataStore} from './data_store';
import {error} from './logger';

const {setData, useData} = createDataStore<string | undefined>();
const {setData: setInfoData, useData: useInfoData} = createDataStore<DetailsModel | undefined>();

export function setDetailsLink(link?: string): void {
  setData(link);
  if (link !== undefined) {
    fetchData(link).then(setInfoData).catch(error);
  } else {
    setInfoData(undefined);
  }
}

export const useDetailsLink = useData;
export const useDetailsLinkInfo = useInfoData;

interface DetailsModel {
  title?: string;
  sections: Section[];
}

interface Section {
  title?: string;
  lines: Map<string, LineItem[]>;
}

interface Image {
  src: string;
  width: number;
  height: number;
}

type LineItem = string | Image;

export function isImage(item: LineItem): item is Image {
  return typeof item !== 'string';
}

async function fetchData(link: string): Promise<DetailsModel> {
  const html = await fetch(link).then(async res => res.text());
  const doc = parse(html);
  const region = doc.querySelector('aside[role="region"]');
  const stats = doc.querySelector('table.wikitable');
  // eslint-disable-next-line no-null/no-null
  if (region === null) {
    return {sections: []};
  }
  return {
    title: parseTitle(region),
    sections: [...parseSections(region), ...parseStats(stats)],
  };
}

function parseTitle(node: HTMLElement): string | undefined {
  return node.querySelector('h2')?.text;
}

function parseSections(node: HTMLElement): Section[] {
  return node.querySelectorAll('section').map<Section>(el => ({
    title: el.querySelector('h2')?.text,
    lines: new Map(
      el
        .querySelectorAll('div.pi-item.pi-data')
        .map(e => [
          e.querySelector('h3.pi-data-label')?.text ?? '',
          getLineItems(e.querySelector('div.pi-data-value')),
        ])
    ),
  }));
}

function parseStats(node: HTMLElement | null): Section[] {
  // eslint-disable-next-line no-null/no-null
  if (node === null) {
    return [];
  }

  const sections: Section[] = [];
  const lines = node.querySelectorAll('tr');
  let currentSection: Section | undefined;

  for (const line of lines) {
    const title = line.querySelector('th');
    // eslint-disable-next-line no-null/no-null
    if (title !== null) {
      if (currentSection !== undefined) {
        sections.push(currentSection);
      }
      currentSection = {title: title.textContent.trim(), lines: new Map()};
    } else if (currentSection !== undefined) {
      const [left, right] = line.querySelectorAll('td');
      if (left !== undefined && right !== undefined) {
        currentSection.lines.set(left.textContent.trim(), getLineItems(right));
      }
    }
  }

  if (currentSection !== undefined) {
    sections.push(currentSection);
  }

  return sections;
}

function getLineItems(e: HTMLElement | null): LineItem[] {
  const lineItems: LineItem[] = [];
  // eslint-disable-next-line no-null/no-null
  if (e !== null) {
    for (const node of getChildNodes(e)) {
      if (node.nodeType === NodeType.COMMENT_NODE) {
        continue;
      }
      if (node.nodeType === NodeType.TEXT_NODE) {
        lineItems.push(node.text.trim());
      }
      if (node.nodeType === NodeType.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const maybeImg = el.querySelector('img');
        const maybeSrc = maybeImg?.getAttribute('data-src') ?? maybeImg?.getAttribute('src');
        if (maybeSrc !== undefined) {
          lineItems.push({
            src: decodeURIComponent(maybeSrc),
            width: parseFloat(maybeImg?.getAttribute('width') ?? '0'),
            height: parseFloat(maybeImg?.getAttribute('height') ?? '0'),
          });
        } else if (el.tagName === 'BR') {
          lineItems.push('\n');
        } else {
          lineItems.push(el.text.trim());
        }
      }
    }
  }
  return lineItems;
}

function getChildNodes(e: HTMLElement): Node[] {
  if (!e.innerHTML.includes('<span style="white-space: nowrap"></span>')) {
    return e.childNodes;
  }
  const children: Node[] = [];
  for (const node of e.childNodes) {
    if (node.nodeType === NodeType.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.tagName === 'BR') {
        children.push(el);
      } else if (
        el.innerHTML !== '<span style="white-space: nowrap"></span>' &&
        el.innerHTML !== ''
      ) {
        children.push(...getChildNodes(el));
      }
    }
    if (node.nodeType === NodeType.TEXT_NODE) {
      children.push(node);
    }
  }
  return children;
}
