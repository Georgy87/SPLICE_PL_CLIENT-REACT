export const items = {
	Photo: 'Photo',
	Username: 'Username',
	Email: 'Email',
	Name: 'Name',
};

export type ProfileItems = {
	itemName: keyof typeof items;
};

export const ProfileItems: ProfileItems[] = [
	{ itemName: 'Photo' },
	{ itemName: 'Username' },
	{ itemName: 'Email' },
	{ itemName: 'Name' },
];
