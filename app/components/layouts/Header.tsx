'use client';
import signout from '@/app/api/user/signout/route';
import { useAuthState } from '@/app/providers/AuthProvider';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const { user, isLoading } = useAuthState();

  // クライアントサイドのuseState（ローディング）のため
  if (isLoading) return null;
  if (!user) return null;

  const handleSignout = async () => {
    try {
      await signout();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ログアウトに失敗しました。');
    }
  };

  return (
    <header className="bg-white border-b border-wood-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          // onClick={() => setViewMode('classroom')}
        >
          <div className="w-15 h-15">
            <Image
              src={'/icon_seat_tree.webp'}
              width={80}
              height={80}
              alt="Seat Treeのアイコン"
              loading="eager"
            />
          </div>
          <div className="">
            <h1 className="text-xl font-bold font-serif">
              Seat Tree
              <span className="text-[15px] hidden sm:inline">-配慮できる席替えアプリ-</span>
            </h1>
            <div className="bg-orange-100 rounded-lg text-sm font-bold font-serif text-center">
              {!user.is_anonymous ? (
                <p className="bg-orange-100 rounded-lg text-sm font-bold font-serif text-center">
                  {user.user_metadata.name}先生
                </p>
              ) : (
                <Link
                  href={'/user/update'}
                  className="px-1 bg-red-400 rounded-lg text-sm font-bold font-serif text-center hover:bg-red-600"
                >
                  ユーザー登録はこちらから！！
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSignout}
            className="cursor-pointer bg-transparent text-wood-600 hover:bg-wood-100 !shadow-none hidden sm:inline-flex"
          >
            {user.is_anonymous ? 'トップへ戻る' : 'ログアウト'}
          </button>
          {/* レスポンシブで表示切り替え */}
          <button
            className="cursor-pointer bg-transparent text-wood-600 hover:bg-wood-100 !shadow-none sm:hidden"
            onClick={handleSignout}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
