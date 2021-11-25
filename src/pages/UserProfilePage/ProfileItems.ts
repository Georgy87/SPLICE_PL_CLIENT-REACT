export const userInfoItems = {
	Photo: 'Photo',
	Username: 'Username',
	Email: 'Email',
	Name: 'Name',
};

export type UserInfoItems = {
	itemName: keyof typeof userInfoItems;
};

export const ProfileItems: UserInfoItems[] = [
	{ itemName: 'Photo' },
	{ itemName: 'Username' },
	{ itemName: 'Email' },
	{ itemName: 'Name' },
];



export const userInfoTriggers = {
	Update: 'Update',
	DownLoad: 'DownLoad',
	Packs: 'Packs',
};

export type UserInfoTriggers = {
	itemName: keyof typeof userInfoTriggers;
};

export const ProfileTriggerItems: UserInfoTriggers[] = [
	{ itemName: 'Update' },
	{ itemName: 'DownLoad' },
	{ itemName: 'Packs' },
];
