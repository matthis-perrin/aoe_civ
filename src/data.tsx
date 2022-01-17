import {HTMLElement, parse} from 'node-html-parser';

import {AoeModel, Civ} from './model';

export async function fetchData(): Promise<AoeModel> {
  const html = await fetch(
    'https://ageofempires.fandom.com/wiki/Civilizations_(Age_of_Empires_II)'
  ).then(async res => res.text());

  const doc = parse(html);
  return {
    civs: doc
      .querySelectorAll('h3')
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-null/no-null
      .filter(el => el.nextElementSibling !== null && el.nextElementSibling.rawTagName === 'div')
      .map(el => parseCiv(el.childNodes[0]?.text ?? '', el.nextElementSibling))
      .sort((civ1, civ2) => civ1.name.localeCompare(civ2.name)),
  };
}

const dummy =
  'https://static.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest/scale-to-width-down/208?cb=20191107173240';

export function parseCiv(name: string, node: HTMLElement): Civ {
  //   console.log(name, node.querySelector('img')?.attributes);
  const imgUrl =
    node.querySelector('img')?.attributes['data-src'] ??
    node.querySelector('img')?.attributes['src'] ??
    '';
  return {
    name,
    imgUrl,
  };
}
