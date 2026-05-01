import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-wood-700 pt-16 pb-8 px-6 text-wood-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-wood-800 flex items-center justify-center text-wood-200 font-bold text-xl">
              <Image
                src={'/icon_seat_tree.webp'}
                width={100}
                height={100}
                alt="Seat Treeのアイコン"
                loading="eager"
              />
            </div>
            <span className="font-bold font-serif text-2xl text-white">Seat Tree</span>
          </Link>
          <p className="text-sm text-white">先生のための、配慮できる席替えアプリ</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-sm">
          <div className="flex flex-col gap-3 text-center md:text-left">
            {/* <Link href="#" className="hover:text-white transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              利用規約
            </Link> */}
          </div>
          <div className="flex flex-col gap-3 text-center md:text-left">
            <a
              href="https://x.com/Rio_Taro117"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2"
            >
              {/* <span className="font-bold">𝕏</span> 開発者 */}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto border-t border-wood-800 pt-8 text-center text-xs text-white">
        &copy; {new Date().getFullYear()} Seat Tree. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
