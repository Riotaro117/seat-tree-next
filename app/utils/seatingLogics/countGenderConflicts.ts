import { Student } from '@/lib/type';
import { ADJACENT_OFFSETS } from './constants';

/**
 * 隣同士が同じ性別か確認するゆるいチェック→得点は低めで良い
 */
export const countGenderConflicts = (
  assignments: Map<number, string | null>,
  studentsMap: Map<string, Student>,
  rows: number,
  cols: number,
): number => {
  // スコアの設定
  let conflicts = 0;
  for (const [idx, studentId] of assignments.entries()) {
    if (!studentId) continue;
    const student = studentsMap.get(studentId);
    if (!student) continue;

    const r = Math.floor(idx / cols);
    const c = idx % cols;

    for (const offset of ADJACENT_OFFSETS) {
      // 隣の座席の座標
      const nr = r + offset.r;
      const nc = c + offset.c;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const neighborIndex = nr * cols + nc;
        const neighborId = assignments.get(neighborIndex);
        if (neighborId) {
          const neighborStudent = studentsMap.get(neighborId);
          if (neighborStudent) {
            if (neighborStudent.gender === student.gender && neighborStudent.gender !== 'other') {
              conflicts++;
            }
          }
        }
      }
    }
  }
  // 点数を出力
  return conflicts;
};
