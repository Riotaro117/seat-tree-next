import Image from 'next/image';
import UpdateForm from './components/UpdateForm';
import SigninLink from './components/SigninLink';

const UpdateUser = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border-4 border-wood-200 text-center">
        <div className="w-50 h-50 mx-auto sm:w-70 sm:h-70">
          <Image
            src={'/icon_seat_tree.webp'}
            alt="Seat Treeのアイコン"
            width={500}
            height={500}
            loading="eager"
          />
        </div>
        <h1 className="text-3xl font-bold text-wood-800 font-serif mb-2">Seat Tree</h1>
        <p className="text-wood-500 mb-8 font-serif">-配慮できる席替えアプリ-</p>
        <p className="text-wood-500 mb-8">以下の情報を入力し、ユーザーを登録して下さい。</p>
        <UpdateForm />
        <SigninLink />
      </div>
    </div>
  );
};

export default UpdateUser;
