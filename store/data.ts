import { BoardData } from '@/app/component/main/app';
import { atom } from 'jotai';
import { focusAtom } from 'jotai-optics'
import { splitAtom } from 'jotai/utils'
import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage('theme', "dark")

export const currentUserAtom = atom(0)

export type BoardStoreData = BoardData | null;

const initBoard: BoardStoreData = null;

export const boardAtom = atom<BoardStoreData>(initBoard)

export const statesAtom = focusAtom(boardAtom, (optic) => optic.prop("states"));
export const statesAtomsAtom = splitAtom(statesAtom);
