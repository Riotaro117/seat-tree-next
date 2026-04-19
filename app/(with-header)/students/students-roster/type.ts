import type { ReactNode } from 'react';

export type Tab = {
  id: number;
  label: string;
  content: ReactNode; // ReactNodeは文字列、JSX、コンポーネント、Fragment、okになる
};
