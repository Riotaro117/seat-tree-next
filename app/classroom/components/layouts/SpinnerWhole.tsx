import { Loader2 } from 'lucide-react';

const SpinnerWhole = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center gap-5 bg-wood-50">
      <span className="text-wood-500 font-bold font-serif">読み込み中...</span>
      <Loader2 className="w-5 h-5 animate-spin" />
    </div>
  );
};

export default SpinnerWhole;
