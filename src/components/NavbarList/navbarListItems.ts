import { icons } from '../../layouts/IconLayout/IconLayout';

export type navbarListItemsType = {
	pageName: string;
	iconName: keyof typeof icons;
};

export const navbarListItems: navbarListItemsType[] = [
	{
		pageName: 'LIKES',
		iconName: 'likes',
	},
	{
		pageName: 'PROFILE',
		iconName: 'profile',
	},
];
