import { Student } from '@/lib/type';

// ドラッグ中に追従するオーバーレイカード（半透明カード）
const OverlayCard = ({ student }: { student: Student | null }) => {
  let deskColor = 'bg-wood-100 border-dashed';
  let textColor = 'text-wood-300';
  if (student) {
    if (student.gender === 'boy') {
      deskColor = 'bg-sky-100';
      textColor = 'text-blue-900';
    } else if (student.gender === 'girl') {
      deskColor = 'bg-rose-100';
      textColor = 'text-pink-900';
    }
  }

  return (
    <div
      className={`aspect-[4/3] w-24 rounded-xl flex flex-col items-center justify-center p-2 border-b-4 border-wood-400 shadow-2xl opacity-90 rotate-3 scale-110 cursor-grabbing ${deskColor}`}
    >
      <span
        className={`text-center font-bold leading-tight ${textColor}`}
        style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}
      >
        {student ? student.name : '空席'}
      </span>
    </div>
  );
};

export default OverlayCard;
