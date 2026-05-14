import { Student } from '@/lib/type';
import { ADJACENT_OFFSETS } from './constants';

/**
 * 絶対にしてほしくない違反のチェック→後に高得点にする（前列配慮、相性が悪い同士）
 */
export const countHardConflicts = (
  assignments: Map<number, string | null>, // 全体の座席配置のこと
  studentsMap: Map<string, Student>, // Mapを使うとfindせず高速アクセス可能
  rows: number,
  cols: number,
  frontRowLimit: number,
): number => {
  // スコアの設定
  let conflicts = 0;
  // 全席を一つずつチェック(rows * colsで全席)
  for (const [idx, studentId] of assignments.entries()) {
    // 生徒のIDが存在しないときは次の反復処理へ
    if (!studentId) continue;
    // 座席のidから生徒情報を取得
    const student = studentsMap.get(studentId);
    if (!student) continue;

    // 現在座っている座席の位置情報
    const r = Math.floor(idx / cols);
    const c = idx % cols;

    // 1. 視力チェック、違反なら加点
    if (student.needsFrontRow && r >= frontRowLimit) {
      conflicts++;
    }
    // 2. 相性が悪いチェック
    // 左右上下の座席をforで順番に一つずつ定義する
    for (const offset of ADJACENT_OFFSETS) {
      // 隣の席の座標
      const nr = r + offset.r;
      const nc = c + offset.c;
      // 教室の外に出ていないかチェック、行、列が０以上かつ最大値未満
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        // 2次元→1次元に変換、１行にcols個並んでいるなら、何行分スキップしたか*cols＋その行の何番目か
        const neighborIndex = nr * cols + nc;
        // 隣の人のidを取得
        const neighborId = assignments.get(neighborIndex);
        if (neighborId) {
          if (student.badChemistryWith.includes(neighborId)) conflicts++;
          // お互いに相性が悪いなら二重チェックになるけど、加点したままで良い
        }
      }
    }
  }
  // 点数を出力
  return conflicts;
};
