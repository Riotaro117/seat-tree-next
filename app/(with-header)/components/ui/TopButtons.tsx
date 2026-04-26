'use client';
import { useAuthState } from '@/app/providers/AuthProvider';
import { ImageIcon, Printer, Save, Settings, Shuffle, Users } from 'lucide-react';
import Link from 'next/link';
import type { UseReactToPrintFn } from 'react-to-print';
import Spinner from '../layouts/Spinner';

interface TopButtonsProps {
  handleRandomize: () => void;
  handleSaveCurrentLayout: () => Promise<void>;
  handlePrintCurrentLayout: UseReactToPrintFn;
}

const TopButtons: React.FC<TopButtonsProps> = ({
  handleRandomize,
  handleSaveCurrentLayout,
  handlePrintCurrentLayout,
}) => {
  const { isLoading } = useAuthState();
  const brownButtonDesign =
    'cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 bg-wood-600 text-white hover:bg-wood-700 shadow-wood-800/20 shadow-md';
  const whiteButtonDesign =
    'cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 bg-white text-wood-800 border-2 border-wood-200 hover:border-wood-400 hover:bg-wood-50 shadow-md';

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8 sticky top-20 z-20 py-2 bg-wood-50/90 backdrop-blur-sm rounded-xl">
      <button className={`${brownButtonDesign}`} onClick={handleRandomize} disabled={isLoading}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Shuffle className="w-5 h-5" />
            席替え実行
          </>
        )}
      </button>
      <Link href={'/seat-layouts/settings'} className={`${whiteButtonDesign}`}>
        <Settings className="w-5 h-5" />
        座席設定
      </Link>
      <Link href={'/students/students-roster'} className={`${whiteButtonDesign}`}>
        <Users className="w-5 h-5" />
        <span>生徒名簿</span>
      </Link>
      <Link href={'/seat-layouts/history'} className={`${whiteButtonDesign}`}>
        <ImageIcon className="w-5 h-5" />
        <span>履歴</span>
      </Link>
      <button
        className={`${whiteButtonDesign}`}
        onClick={handleSaveCurrentLayout}
        disabled={isLoading}
      >
        <Save className="w-5 h-5" />
        保存
      </button>
      <button
        className={`${whiteButtonDesign}`}
        onClick={handlePrintCurrentLayout}
        disabled={isLoading}
      >
        <Printer className="w-5 h-5" />
        印刷
      </button>
    </div>
  );
};

export default TopButtons;
