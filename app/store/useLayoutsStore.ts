import type { ClassroomLayout } from '@/lib/type';
import { atom, useAtom } from 'jotai';

const layoutsAtom = atom<ClassroomLayout[]>([]);

export const useLayoutsStore = () => {
  const [layouts, setLayouts] = useAtom(layoutsAtom);
  return { layouts, setLayouts };
};
