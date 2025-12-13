import { atomWithStorage } from 'jotai/utils';

// 'en' is the default
export const languageAtom = atomWithStorage('app-language', 'en');
