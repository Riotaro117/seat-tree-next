/**
 * フィッシャーイェーツのアルゴリズム
 */
// ジェネリクスは型を引数として受け取る仕組み
export const shuffle = <T>(array: T[]): T[] => {
  // 配列をコピーする
  const arr = [...array];
  // 一番後ろから順番に前に進む
  for (let i = arr.length - 1; i > 0; i--) {
    // 0~1つ手前の中からランダムに選ぶ
    const j = Math.floor(Math.random() * (i + 1));
    // 一番後ろの数字と選ばれた数字を交換する
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // 配列を出力する
  return arr;
};
