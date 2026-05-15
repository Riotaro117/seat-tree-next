import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const frontRowLimitAtom = atomWithStorage<number>('frontRowLimit', 2);

export const useFrontRowLimitStore = () => {
  const [frontRowLimit, setFrontRowLimit] = useAtom(frontRowLimitAtom);
  return {
    frontRowLimit,
    setFrontRowLimit,
  };
};
