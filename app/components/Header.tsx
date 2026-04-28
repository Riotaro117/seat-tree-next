import Image from 'next/image';
import SigninAnonymously from './SigninAnonymously';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-wood-50/80 backdrop-blur-md border-b border-wood-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-15 h-15 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Image
              src={'/icon_seat_tree.webp'}
              width={100}
              height={100}
              alt="Seat Treeのアイコン"
              loading="eager"
            />
          </div>
          <h1 className="text-2xl font-bold font-serif tracking-wide text-wood-800">Seat Tree</h1>
        </Link>
        <div className="flex gap-2">
          <Link
            href="/user/signin"
            className="bg-wood-700 hover:bg-wood-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            ログイン
          </Link>
          <SigninAnonymously />
        </div>
      </div>
    </header>
  );
};

export default Header;
