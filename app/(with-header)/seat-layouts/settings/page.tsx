import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import SettingButtons from './components/SettingButtons';
import ClassroomLayout from './components/ClassroomLayout';
import Cautions from './components/Cautions';

const LayoutsSettings: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-wood-200 p-6 h-full flex flex-col max-w-4xl mx-auto">
      <div className="mb-6 ">
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold font-serif flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-wood-500" />
              座席設定
            </h2>
            <Link
              href={'/'}
              className="cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 bg-white text-wood-800 border-2 border-wood-200 hover:border-wood-400 hover:bg-wood-50"
            >
              完了
            </Link>
          </div>
          <p className="text-wood-500 text-sm mt-5">教室の座席数と列数を指定して下さい。</p>
          <SettingButtons />
          <p className="text-wood-500 text-sm mt-5">
            座席をクリックすると、席替えの時に生徒が座らない座席を設定できます。
          </p>
          <span className="text-wood-500 text-sm mt-1">
            座席がコの字などのクラスで利用して下さい。
          </span>
        </div>
      </div>
      <Cautions/>
      <ClassroomLayout />
    </div>
  );
};

export default LayoutsSettings;
