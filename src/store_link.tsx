import {HTMLElement, parse} from 'node-html-parser';

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
  lines: Map<string, string>;
}

async function fetchData(link: string): Promise<DetailsModel> {
  const html = await fetch(link).then(async res => res.text());
  const doc = parse(html);
  const region = doc.querySelector('aside[role="region"]');
  // eslint-disable-next-line no-null/no-null
  if (region === null) {
    return {sections: []};
  }
  return {
    title: parseTitle(region),
    sections: parseSections(region),
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
          e.querySelector('div.pi-data-value')?.text ?? '',
        ])
    ),
  }));
}
