import { Users } from 'lucide-react';
import Link from 'next/link';
import CountCurrentStudents from './components/CountCurrentStudents';
import DeleteAllStudentsButton from './components/DeleteAllStudentsButton';
import AddStudentTabs from './components/add-student-tabs/AddStudentTabs';
import StudentsList from './components/students-list/StudentsList';
import ExplainChangeSeat from './components/ExplainChangeSeat';

const StudentsRoster = () => {
  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl border-4 border-wood-200 p-6 h-full flex flex-col max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold font-serif flex items-center gap-2">
              <Users className="w-6 h-6 text-wood-500" />
              生徒名簿
            </h2>
            <Link
              href={'/classroom'}
              className="cursor-pointer px-4 py-2 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 bg-white text-wood-800 border-2 border-wood-200 hover:border-wood-400 hover:bg-wood-50"
            >
              完了
            </Link>
          </div>
          <ExplainChangeSeat />
        </div>
        <AddStudentTabs />
        <CountCurrentStudents />
        <StudentsList />
        <DeleteAllStudentsButton />
      </div>
    </>
  );
};

export default StudentsRoster;
