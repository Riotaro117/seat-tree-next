import { getStudentDeskStyle } from '@/app/utils/getStudentDeskStyle';
import type { Student } from '@/lib/type';

// ドラッグ中に追従するオーバーレイカード（半透明カード）
const OverlayCard = ({ student }: { student: Student | null }) => {
  const { deskColor, nameColor } = getStudentDeskStyle(student);

  return (
    <div
      className={`aspect-[4/3] w-24 rounded-xl flex flex-col items-center justify-center p-2 border-b-4 border-wood-400 shadow-2xl opacity-90 rotate-3 scale-110 cursor-grabbing ${deskColor}`}
    >
      <span
        className={`text-center font-bold leading-tight ${nameColor}`}
        style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}
      >
        {student ? student.name : '空席'}
      </span>
    </div>
  );
};

export default OverlayCard;
