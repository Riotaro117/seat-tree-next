import type { Database } from './database.types';
import type { Student } from './type';

const isGender = (value: string): value is 'boy' | 'girl' | 'other' =>
  value === 'boy' || value === 'girl' || value === 'other';

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
};

type StudentRow = Database['public']['Tables']['students']['Row'];

// DB層とアプリ層のキー名（needs_front_row）→（needsFrontRow）へ変換
export const formatStudent = (data: StudentRow): Student => {
  return {
    id: data.id,
    name: data.name,
    gender: isGender(data.gender) ? data.gender : 'other',
    needsFrontRow: data.needs_front_row ?? false,
    badChemistryWith: toStringArray(data.bad_chemistry_with),
  };
};
