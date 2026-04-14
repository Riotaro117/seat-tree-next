import { atom, useAtom } from 'jotai';

const totalSeatsStore = atom<number>(30);

export const useTotalSeatsStore = () => {
  const [totalSeats, setTotalSeats] = useAtom(totalSeatsStore);
  return { totalSeats, setTotalSeats };
};
