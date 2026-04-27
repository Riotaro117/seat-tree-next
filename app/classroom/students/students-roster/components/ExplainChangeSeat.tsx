'use client';
import { useFrontRowLimitStore } from '@/app/store/useFrontRowLimitStore';

const ExplainChangeSeat = () => {
  const { frontRowLimit, setFrontRowLimit } = useFrontRowLimitStore();

  return (
    <div className="p-5 bg-wood-100 border border-wood-200 rounded-xl mt-2 text-wood-800">
      <h3 className="p-1 w-fit font-bold bg-wood-50 border border-wood-200 rounded-lg">
        席替えについて
      </h3>
      <ul className="flex flex-col gap-3 mt-2">
        <li className="text-sm">
          1. 基本的に男女が交互に座ります。
          <br />
          <span className="text-red-400">( 比率が均等でない場合は同性で座ることもあります。 )</span>
        </li>
        <li className="text-sm">
          2. 前列希望は、前から
          <select
            value={frontRowLimit}
            className="cursor-pointer p-2 w-27 text-sm border border-wood-200 bg-white rounded-lg"
            onChange={(e) => setFrontRowLimit(Number(e.target.value))}
          >
            <option value={1}>1列目まで</option>
            <option value={2}>2列目まで</option>
            <option value={3}>3列目まで</option>
          </select>
          に座ります。
          <br />
          <span className="text-red-400">( 席数に対して希望者が超過するとできません。 )</span>
        </li>
        <li className="text-sm">3. NG設定は、NG相手と前後左右を避けて座ります。</li>
      </ul>
    </div>
  );
};

export default ExplainChangeSeat;
