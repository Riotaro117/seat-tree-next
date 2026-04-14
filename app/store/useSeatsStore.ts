import type { Seat } from '@/lib/type';
import { atom, useAtom } from 'jotai';

const seatsStore = atom<Seat[]>([]);

export const useSeatsStore = () => {
  const [seats, setSeats] = useAtom(seatsStore);
  return { seats, setSeats };
};
