import Image from 'next/image';
import SigninAnonymously from './SigninAnonymously';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-wood-50/80 backdrop-blur-md border-b border-wood-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <Link href="/" className="flex items-center justify-center sm:justify-start gap-3 group w-full sm:w-[40%]">
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
        <div className="flex items-center justify-center gap-2 w-full sm:w-[60%]">
          <Link
            href="/user/signin"
            className="cursor-pointer flex items-center justify-center px-4 py-3 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 text-white w-full text-sm sm:text-md md:text-xl bg-lime-600 hover:bg-lime-700 shadow-lime-800/20"
          >
            ログイン
          </Link>
          <div className="w-full">
            <SigninAnonymously />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
