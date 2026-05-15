type History = {
  version: string;
  date: string;
  content: string;
};

export const historyData: History[] = [
  { version: '1.0.1', date: '2026.2.23', content: 'スマホブラウザで表示できないバグ修正' },
  {
    version: '1.0.2',
    date: '2026.2.26',
    content: 'テストユーザーの生徒で明智光秀が二人おり、片方を石川五右衛門に修正',
  },
  { version: '1.0.3', date: '2026.2.27', content: '今すぐ試す！を今すぐ始める！ボタンに修正' },
  { version: '1.1.0', date: '2026.2.28', content: 'Excelファイルのアップロードに対応' },
  {
    version: '1.2.0',
    date: '2026.3.1',
    content: '前列希望者が何列目までに座るのかを設定できるように対応',
  },
  { version: '1.2.1', date: '2026.3.2', content: '生徒名簿のUIを改善' },
  { version: '1.3.0', date: '2026.3.3', content: '生徒名簿で名前の変更に対応' },
  { version: '1.4.0', date: '2026.3.5', content: 'アプリの更新履歴を表示できるように対応' },
  { version: '1.5.0', date: '2026.3.13', content: 'メールで認証ボタンを押した後の挙動を修正' },
  { version: '1.5.1', date: '2026.3.13', content: '更新履歴のUIを修正' },
  {
    version: '2.0.0',
    date: '2026.4.26',
    content: '大幅なコードの見直し、座席UIの変更、座席のドラッグ&ドロップ対応',
  },
  {
    version: '3.0.0',
    date: '2026.4.30',
    content: 'トップページの追加、ページの構造の変更、ルーティングの見直し',
  },
  {
    version: '3.1.0',
    date: '2026.5.1',
    content: 'ユーザー登録ページの追加、メール認証の改善',
  },
  {
    version: '3.1.1',
    date: '2026.5.3',
    content: 'ゲストログインボタンの表示を変更',
  },
  {
    version: '3.1.2',
    date: '2026.5.8',
    content: '相性の計算結果の最適化、処理速度の向上',
  },
  {
    version: '3.2.0',
    date: '2026.5.12',
    content: 'ドラッグ&ドロップの挙動の変更、処理の最適化',
  },
  {
    version: '4.0.0',
    date: '2026.5.15',
    content: "アプリのアイコンの一新、全体的なデザインの新調、座席設定画面のデザイン変更、席替えのロジックの最適化",
  },
  {
    version: '4.1.0',
    date: '2026.5.16',
    content: "更新ボタンを押しても座席配列、総座席数、列数の設定、前列の設定が残るように変更、細かなデザインの変更",
  },
];
