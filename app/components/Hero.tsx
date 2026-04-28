import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 overflow-hidden flex items-center min-h-[85vh]">
      {/* 装飾用の背景円 */}
      <div className="absolute top-1/4 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1200px] lg:h-[1200px] bg-wood-200/40 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none" />

      {/* フレックスコンテナ（PC時は横並び） */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-20">
        
        {/* メインコピー部分 */}
        <div className="w-full lg:w-[45%] text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md text-wood-700 text-sm font-bold mb-6 sm:mb-8 border border-white shadow-sm animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wood-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-wood-600"></span>
            </span>
            先生のための新しい席替え体験
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-wood-800 leading-[1.2] mb-6 sm:mb-8 tracking-tight">
            配慮しながら
            <br className="md:hidden" />
            ワンクリック席替え
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-wood-600 mb-8 sm:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed pr-0 lg:pr-8">
            複雑な人間関係や配慮事項も、システムが自動で考慮。
            <br className="hidden md:block lg:hidden xl:block" />
            先生の負担を減らし、クラスに最適な座席表を一瞬で作成します。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <Link
              href="/app"
              className="group flex items-center gap-2 bg-gradient-to-r from-wood-600 to-wood-800 hover:from-wood-700 hover:to-wood-900 text-white text-lg font-medium px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 shadow-xl shadow-wood-800/20 hover:shadow-2xl hover:shadow-wood-800/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              無料でアプリを使う
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 動画ヒーロー部分 */}
        <div className="w-full lg:w-[55%] relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {/* 動画の背後の後光エフェクト */}
          <div className="absolute inset-0 bg-gradient-to-b from-wood-400/20 to-transparent blur-[60px] rounded-[3rem] -z-10" />
          
          {/* グラスモーフィズムなフレーム */}
          <div className="bg-white/40 p-2 sm:p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-wood-900/10 border border-white/80 backdrop-blur-xl relative overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.01]">
            {/* 光沢の反射アクセント */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none rounded-[2rem] md:rounded-[3rem]" />
            
            <video
              src="/hero_movie.mov"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto aspect-video rounded-xl md:rounded-[2rem] object-cover shadow-sm bg-wood-50 relative z-20 border border-wood-100/50"
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
