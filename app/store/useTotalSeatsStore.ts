import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const totalSeatsStore = atomWithStorage<number>('totalSeats', 30);

export const useTotalSeatsStore = () => {
  const [totalSeats, setTotalSeats] = useAtom(totalSeatsStore);
  return { totalSeats, setTotalSeats };
};
