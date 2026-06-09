import type { Character, Attributes } from '../types';
import { createDefaultSkillRows } from './skills';

export const emptyAttributes: Attributes = {
  str: '',
  con: '',
  siz: '',
  dex: '',
  app: '',
  int: '',
  pow: '',
  edu: '',
  luck: '',
};

export function createCharacter(): Character {
  return {
    name: '',
    player: '',
    occupation: '',
    age: '',
    gender: '',
    residence: '',
    hometown: '',
    avatar: undefined,
    attributes: { ...emptyAttributes },
    hpNow: '',
    mpNow: '',
    sanNow: '',
    armor: '',
    occPoints: '',
    intPoints: '',
    skills: createDefaultSkillRows({ ...emptyAttributes }),
    weapons: [
      { name: '徒手格斗', skill: '格斗(斗殴)', damage: '1D3+DB', range: '触及', attacks: '1', ammo: '—', malfunction: '—' },
    ],
    backstory: {
      appearance: '',
      belief: '',
      significantPerson: '',
      significantPlace: '',
      treasure: '',
      trait: '',
      injury: '',
      phobia: '',
      arcane: '',
      description: '',
    },
    assets: { cash: '', spending: '', assets: '', items: '' },
    friends: '',
    experiences: '',
  };
}
