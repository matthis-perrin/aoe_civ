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

/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain */
export function parseCiv(name: string, node: HTMLElement): Civ {
  const imgUrl =
    node.querySelector('img')?.attributes['data-src'] ??
    node.querySelector('img')?.attributes['src'] ??
    '';
  const info = node
    .querySelectorAll('.wds-tab__content > ul > li')
    .map(el => ({label: el.querySelector('b')?.text ?? '', el}));

  const specialty = parseSpecialty(info.find(i => i.label.includes('Specialty'))!.el);
  const uniqUnits = parseUniqUnits(info.find(i => i.label.includes('Unique unit'))!.el);
  const uniqTechs = parseUniqTechs(info.find(i => i.label.includes('Unique technologies'))!.el);
  const bonuses = parseBonuses(info.find(i => i.label.includes('Civilization bonuses'))!.el);
  const teamBonus = parseTeamBonus(info.find(i => i.label.includes('Team bonus'))!.el);

  return {
    name,
    imgUrl,
    specialty,
    uniqUnits,
    uniqTechs,
    bonuses,
    teamBonus,
  };
}

export function parseSpecialty(node: HTMLElement): string {
  return node.querySelector('a')?.text!;
}
export function parseUniqUnits(node: HTMLElement): string[] {
  return node
    .querySelectorAll('a')
    .map(el => el.text.trim())
    .filter(str => str.length > 0);
}
export function parseUniqTechs(node: HTMLElement): string[] {
  return node
    .querySelectorAll('li')
    .map(el => el.text.trim())
    .filter(str => str.length > 0);
}
export function parseBonuses(node: HTMLElement): string[] {
  return node
    .querySelectorAll('li')
    .map(el => el.text.trim())
    .filter(str => str.length > 0);
}
export function parseTeamBonus(node: HTMLElement): string {
  return node.text.replace('Team bonus:', '').trim();
}
/* eslint-enable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain */
