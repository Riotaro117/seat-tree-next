import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SigninForm from './components/SigninForm';
import SigninAnonymously from './components/SigninAnonymously';
import { historyData } from '@/app/update-history/historyData';

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lime-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border-4 border-wood-200 text-center">
        <div className="w-50 h-50 mx-auto sm:w-70 sm:h-70">
          <Image
            src={'/icon_seat_tree.webp'}
            width={800}
            height={800}
            alt="Seat Treeのアイコン"
            loading="eager"
          />
        </div>
        <h1 className="text-3xl font-bold text-wood-800 font-serif mb-2">Seat Tree</h1>
        <p className="text-wood-500 mb-2 font-serif">-配慮できる席替えアプリ-</p>
        <Link
          className="flex justify-center mx-auto w-[200px] gap-3 mb-8 p-2 cursor-pointer bg-wood-600 text-wood-100 rounded-lg hover:bg-wood-500  font-serif"
          href={'/update-history'}
        >
          <span>v {historyData.at(-1)?.version} 更新履歴</span>
          <ExternalLink className="w-6 h-6 text-white" />
        </Link>

        <SigninForm />
        <SigninAnonymously />

        <p className="text-wood-500 mt-8 text-sm">
          個人情報は、通信の暗号化とアクセス制御により
          <br />
          安全に保護されています。
        </p>
      </div>
    </div>
  );
};

export default Signin;
