import { icons } from '../../layouts/IconLayout/IconLayout';

export type navbarListItemsType = {
  pageName: string;
  iconName: keyof typeof icons;
  link: string;
};

export const navbarListItems: navbarListItemsType[] = [
  {
    pageName: 'LIKES',
    iconName: 'likes',
    link: 'likes-link',
  },
  {
    pageName: 'PROFILE',
    iconName: 'profile',
    link: 'profile-link',
  },
  {
    pageName: 'SEQUENCER',
    iconName: 'sequencer',
    link: 'sequencer-link',
  },
];
