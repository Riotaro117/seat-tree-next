import { atom, useAtom } from 'jotai';

const colsStore = atom<number>(6);

export const useColsStore = () => {
  const [cols, setCols] = useAtom(colsStore);
  return { cols, setCols };
};
