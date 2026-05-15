import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const colsStore = atomWithStorage<number>('cols', 6);

export const useColsStore = () => {
  const [cols, setCols] = useAtom(colsStore);
  return { cols, setCols };
};
