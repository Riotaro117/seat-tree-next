import type { Seat } from '@/lib/type';
import { useAtom } from 'jotai';
import { useTotalSeatsStore } from './useTotalSeatsStore';
import { useColsStore } from './useColsStore';
import { atomWithStorage } from 'jotai/utils';

// ローカルストレージに保存
const seatsStore = atomWithStorage<Seat[]>('seats', [], undefined, { getOnInit: true });

export const useSeatsStore = () => {
  const [seats, setSeats] = useAtom(seatsStore);
  const { setTotalSeats } = useTotalSeatsStore();
  const { cols, setCols } = useColsStore();

  // 総座席数が変わったときに教室の座席配置を作り直す関数
  const handleResizeSeats = (totalSeats: number) => {
    // 総座席数の更新
    setTotalSeats(totalSeats);
    // 引数のtotalSeatsを元に新しい座席データを作成する
    // 引数のtotalSeatsを配列のようなオブジェクトlength:totalSeatsとして配列にしている
    // 使わないvalueは_で示している elementはundefinedなので存在しない
    const newSeats: Seat[] = Array.from({ length: totalSeats }, (_, i) => ({
      id: `seat-${Math.floor(i / cols)}-${i % cols}`,
      row: Math.floor(i / cols),
      col: i % cols,
      studentId: null, // 初めは誰も座っていない
      isDisabled: false,
    }));
    // 座席情報の更新
    setSeats(newSeats);
  };

  const handleResizeCols = (cols: number, totalSeats: number) => {
    setCols(cols);
    const newSeats: Seat[] = Array.from({ length: totalSeats }, (_, i) => ({
      id: `seat-${Math.floor(i / cols)}-${i % cols}`,
      row: Math.floor(i / cols),
      col: i % cols,
      studentId: null,
      isDisabled: false,
    }));
    setSeats(newSeats);
  };
  return { seats, setSeats, handleResizeSeats, handleResizeCols };
};
