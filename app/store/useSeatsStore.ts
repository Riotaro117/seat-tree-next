import type { Seat } from '@/lib/type';
import { atom, useAtom } from 'jotai';
import { useTotalSeatsStore } from './useTotalSeatsStore';
import { useColsStore } from './useColsStore';

const seatsStore = atom<Seat[]>([]);

export const useSeatsStore = () => {
  const [seats, setSeats] = useAtom(seatsStore);
  const { setTotalSeats } = useTotalSeatsStore();
  const { cols, setCols } = useColsStore();

  // 総座席数が変わったときに教室の座席配置を作り直す関数
  const handleResizeSeats = (size: number) => {
    // 総座席数の更新
    setTotalSeats(size);
    // 引数のsizeを元に新しい座席データを作成する
    // 引数のsizeを配列のようなオブジェクトlength:sizeとして配列にしている
    // 使わないvalueは_で示している elementはundefinedなので存在しない
    const newSeats: Seat[] = Array.from({ length: size }, (_, i) => ({
      id: `seat-${Math.floor(i / cols)}-${i % cols}`,
      row: Math.floor(i / cols),
      col: i % cols,
      studentId: null, // 初めは誰も座っていない
      isDisabled: false,
    }));
    // 座席情報の更新
    setSeats(newSeats);
  };

  const handleResizeCols = (size: number, totalSeats: number) => {
    setCols(size);
    const newSeats: Seat[] = Array.from({ length: totalSeats }, (_, i) => ({
      id: `seat-${Math.floor(i / size)}-${i % size}`,
      row: Math.floor(i / size),
      col: i % size,
      studentId: null,
      isDisabled: false,
    }));
    setSeats(newSeats);
  };
  return { seats, setSeats, handleResizeSeats, handleResizeCols };
};
