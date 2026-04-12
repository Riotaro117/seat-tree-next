import { HistoryIcon } from 'lucide-react';
import { historyData } from './historyData';
import Link from 'next/link';

const UpdateHistory = () => {
  return (
    <div className="bg-black/40 flex-1 overflow-x-auto z-50">
      <div className="min-h-screen flex items-center justify-center  p-4 text-wood-800">
        <div className="  bg-white rounded-3xl p-6 shadow-xl  flex flex-col">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <div>
              <h2 className="text-2xl font-bold font-serif flex items-center gap-2">
                <HistoryIcon className="w-6 h-6 text-wood-500" />
                更新履歴
              </h2>
            </div>
            <Link
              className="cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 bg-white text-wood-800 border-2 border-wood-200 hover:border-wood-400 hover:bg-wood-50"
              href={'/user/signin'}
            >
              戻る
            </Link>
          </div>
          <div className="text-center text-wood-500">
            <p>いつもアプリをご愛好いただき、ありがとうございます。</p>
            <p>
              作成者にアプリのフィードバックをいただけますと、さらなる励みになりますので、よろしくお願いします。
            </p>
          </div>
          {historyData.reverse().map((history) => {
            return (
              <div
                key={history.version}
                className="mt-5 text-wood-500 flex flex-col items-start gap-2"
              >
                <span className="p-3 bg-lime-600 rounded-lg text-wood-100 text-left">
                  v{history.version} <span className="text-sm">[{history.date}更新]</span>
                </span>
                <p className="text-wood-800 bg-wood-50 p-3 rounded-lg w-full text-left">
                  {history.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpdateHistory;
