import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { historyData } from '../update-history/historyData';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 overflow-hidden flex items-center min-h-[85vh]">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/classroom.webp"
          alt="Classroom Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* テキストの可読性を確保するための白透過オーバーレイ */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* 装飾用の背景円 */}
      <div className="absolute top-1/4 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1200px] lg:h-[1200px] bg-wood-200/40 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none z-10" />

      {/* フレックスコンテナ（PC時は横並び） */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-3 lg:gap-16 relative z-20">
        {/* メインコピー部分 */}
        <div className="w-full lg:w-[35%] text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-4xl 2xl:text-6xl font-bold font-serif text-wood-800 leading-[1.2] mb-6 sm:mb-8 tracking-tight">
            配慮できる
            <br />
            席替えアプリ
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-wood-600 mb-8 sm:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed pr-0 lg:pr-8">
            複雑な人間関係や配慮事項も、システムが自動で考慮。
            <br className="hidden md:block lg:hidden xl:block" />
            先生の負担を減らし、クラスに最適な座席表を一瞬で作成します。
          </p>
          <Link
            className="flex justify-center mx-auto w-[200px] gap-3 mb-8 p-2 cursor-pointer bg-wood-600 text-wood-100 rounded-lg hover:bg-wood-500  font-serif"
            href={'/update-history'}
          >
            <span>v {historyData.at(-1)?.version} 更新履歴</span>
            <ExternalLink className="w-6 h-6 text-white" />
          </Link>
        </div>

        {/* 動画ヒーロー部分 */}
        <div className="w-full lg:w-[65%] relative">
          {/* グラスモーフィズムなフレーム */}
          <div className="bg-wood-300 p-2 sm:p-4 md:p-6 rounded-xl md:rounded-[2rem] shadow-2xl shadow-wood-900/10 border border-white/80 backdrop-blur-xl relative overflow-hidden ">
            <video
              src="/hero_movie.mov"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto aspect-video rounded-xl md:rounded-[2rem] object-cover shadow-sm bg-wood-50 relative z-20 border border-wood-100/50 transition-transform duration-700 ease-out hover:scale-[1.5]"
              aria-label="Seat Treeのデモ動画"
            >
              ご使用のブラウザは動画の再生に対応していません。
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
