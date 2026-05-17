import { Seat, Student } from '@/lib/type';
import { shuffle } from './shuffle';
import { countHardConflicts } from './countHardConflicts';
import { countGenderConflicts } from './countGenderConflicts';
import { ATTEMPTS, HARD_CONFLICT_WEIGHT } from './constants';

/**
制約をもとに席替えをし、点数をつける。
その点数が一番低いものをベストな席替えとして出力する
 */
export const generateSeatingChart = (
  seats: Seat[],
  rows: number,
  cols: number,
  students: Student[],
  frontRowLimit: number,
): Seat[] => {
  // 席替えで利用できる座席を定義する
  const enabledSeats = seats.filter((seat) => !seat.isDisabled);
  // 1次元配列に戻す
  const enabledIndices = enabledSeats.map((seat) => seat.row * cols + seat.col);
  // 使用できる座席のインデックスをセットする
  const enabledSet = new Set(enabledIndices);

  if (enabledIndices.length < students.length)
    throw new Error('使用可能な座席が少なく、生徒が座れません。使用可能な座席を増やして下さい。');

  // 生徒のidと情報をキーとバリューで持つ（高速アクセス用）
  const studentsMap = new Map(students.map((s) => [s.id, s]));
  // 前列優先と通常生徒を分ける
  const frontRowStudents = students.filter((student) => student.needsFrontRow);
  const regularStudents = students.filter((student) => !student.needsFrontRow);

  // 前列優先座席のインデックスと後部座席のインデックスが入る空配列を用意
  const frontRowIndices: number[] = [];
  const backRowIndices: number[] = [];

  // 座席一つ一つに一次元配列のインデックスを与えて、どこからどこまでが優先座席なのか明確にする
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // 1次元配列を指定
      const idx = r * cols + c;
      // 使用不可の座席であればスキップする
      if (!enabledSet.has(idx)) continue;

      if (r < frontRowLimit) {
        // 0,1列目に優先座席を入れて、あとは通常席を入れる
        frontRowIndices.push(idx);
      } else {
        backRowIndices.push(idx);
      }
    }
  }

  // 生徒を座席に座らせていく処理
  const assignStudents = (
    shuffledIndices: number[],
    stack: Student[],
    assignments: Map<number, string | null>,
  ) => {
    shuffledIndices.forEach((idx) => {
      if (stack.length > 0) {
        assignments.set(idx, stack.pop()!.id);
      }
    });
  };

  // 席替え後に一番スコアの良かった席配列を入れる
  let bestAssignments = new Map<number, string | null>();
  // 無限大にしておくことで、後にスコアが存在するかどうかで使える
  let minScore = Infinity;

  // 500回繰り返す
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    // これからの処理で座らせていく教室配置のこと
    const assignments = new Map<number, string | null>();

    // 前列の座席のインデックスのみシャッフル
    const shuffledFrontRowIndices = shuffle(frontRowIndices);
    // 前列の生徒のみシャッフルしてまとめる
    const frontStack = shuffle(frontRowStudents);

    // 前列の席のインデックスを順番に教室配置に振っていく
    assignStudents(shuffledFrontRowIndices, frontStack, assignments);

    // 通常の生徒と前列で座れなかった生徒で後列へ行く生徒を指定する
    const backStack = [...regularStudents, ...frontStack];
    const remainingIndices = [
      // 前列座席のうち、assignmentsに登録されていないインデックスを残す
      ...shuffledFrontRowIndices.filter((idx) => !assignments.has(idx)),
      ...backRowIndices,
    ];
    // 残っている座席のインデックスをシャッフルする
    const shuffledRemainingIndices = shuffle(remainingIndices);
    // 後ろの生徒をシャッフルする
    const shuffledBackStudents = shuffle(backStack);
    // シャッフルした残りの座席に一人ずつ残っている生徒のidを振っていく
    assignStudents(shuffledRemainingIndices, shuffledBackStudents, assignments);

    // 制約の重さをそれぞれ定義する
    const hardConflicts = countHardConflicts(assignments, studentsMap, rows, cols, frontRowLimit);
    const genderConflicts = countGenderConflicts(assignments, studentsMap, rows, cols);
    // 厳しい制約には1000倍の採点をする
    const score = hardConflicts * HARD_CONFLICT_WEIGHT + genderConflicts;
    // 最小のスコアより良いスコアかどうか
    if (score < minScore) {
      // 現在のスコアを最小のスコアにして考える
      minScore = score;
      // 現在の座席配置をベスト配置にコピーする
      bestAssignments = new Map(assignments);
      // 0点が出たら500回せずその時点で席替えを終える
      if (minScore === 0) break;
    }
  }

  // ベスト配置をMap型からSeat型（配列）に変換
  const finalSeats: Seat[] = seats.map((seat) => {
    const idx = seat.row * cols + seat.col;
    return {
      ...seat,
      studentId: bestAssignments.get(idx) ?? null,
    };
  });

  //ベストな席を出力する
  return finalSeats;
};
