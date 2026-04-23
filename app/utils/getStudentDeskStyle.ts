import type { Seat, Student } from '@/lib/type';

export const getStudentDeskStyle = (
  student: Student | null,
  seat?: Seat,
  hasConflict?: boolean,
) => {
  if (seat?.isDisabled) {
    return {
      deskColor: 'bg-stone-200 border-stone-300 cursor-not-allowed',
      nameColor: 'text-stone-400',
    };
  } else if (!student) {
    return {
      deskColor: 'bg-wood-100 border-wood-200 border-dashed',
      nameColor: 'text-wood-300 text-xs font-medium',
    };
  } else if (hasConflict) {
    return {
      deskColor: 'bg-yellow-200 border-yellow-300 animate-shake',
      nameColor: 'text-red-900',
    };
  }

  const styleMap = {
    boy: {
      deskColor: 'bg-sky-100 border-sky-200 hover:-translate-y-1 hover:shadow-lg',
      nameColor: 'text-blue-900',
    },
    girl: {
      deskColor: 'bg-rose-100 border-rose-200 hover:-translate-y-1 hover:shadow-lg',
      nameColor: 'text-pink-900',
    },
    other: {
      deskColor: 'bg-wood-100 border-dashed border-wood-400 hover:-translate-y-1 hover:shadow-lg',
      nameColor: 'text-wood-300',
    },
  } as const; //リテラル型はその文字列しか入れられない

  return (
    styleMap[student.gender] ?? {
      deskColor: 'bg-wood-100 border-dashed',
      nameColor: 'text-wood-300',
    }
  );
};
