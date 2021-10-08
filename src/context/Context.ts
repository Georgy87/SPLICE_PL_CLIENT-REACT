import { createContext } from 'react';
import { PlayerStateType } from './types';

// export type ContextProps = {
// 	state: PlayerStateType;
// 	setState: ({ type }: { type: string }) => void;
// }

// export const Context = createContext({} as ContextProps[]);

export type ContextProps = {
	state: PlayerStateType;
	setState: (state: any) => void;
}

export const Context = createContext([{}, () => {}]);
