// 隣の座席の相対位置
export const ADJACENT_OFFSETS = [
  { r: 0, c: -1 }, // 左隣
  { r: 0, c: 1 }, // 右隣
  { r: -1, c: 0 }, // 上隣
  { r: 1, c: 0 }, // 下隣
];

// 500回ランダムに席替えをして、スコアが最小のものを見つける
export const ATTEMPTS = 500;

// 席替えの違反の重み
export const HARD_CONFLICT_WEIGHT = 1000;
