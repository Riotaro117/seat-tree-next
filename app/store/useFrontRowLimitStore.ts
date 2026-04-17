import { atom, useAtom } from 'jotai';

const frontRowLimitAtom = atom<number>(2);

export const useFrontRowLimitStore = () => {
  const [frontRowLimit, setFrontRowLimit] = useAtom(frontRowLimitAtom);
  return {
    frontRowLimit,
    setFrontRowLimit,
  };
};
