import type { Student } from '@/lib/type';
import { atom, useAtom } from 'jotai';

const studentsAtom = atom<Student[]>([]);

export const useStudentsStore = () => {
  const [students, setStudents] = useAtom(studentsAtom);
  return { students, setStudents };
};
