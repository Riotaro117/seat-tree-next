import Link from 'next/link';
import {
  CheckCircle2,
  Users,
  Settings2,
  Printer,
  ArrowRight,
  HelpCircle,
  FileSpreadsheet,
  HeartHandshake,
} from 'lucide-react';
import SigninAnonymously from './components/SigninAnonymously';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-wood-50 text-wood-900 font-sans selection:bg-wood-200">
      {/* Header */}
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

      <main>
        {/* ① ヒーローセクション */}
        <section className="relative pt-28 pb-32 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
          {/* 装飾用の背景円 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wood-200/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm text-wood-700 text-sm font-bold mb-8 border border-white shadow-sm animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wood-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-wood-600"></span>
              </span>
              先生のための新しい席替え体験
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-serif text-wood-800 leading-[1.15] mb-8 tracking-tight">
              配慮しながら
              <br className="md:hidden" />
              ワンクリック席替え
            </h2>
            <p className="text-lg md:text-xl text-wood-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              複雑な人間関係や配慮事項も、システムが自動で考慮。
              <br className="hidden md:block" />
              先生の負担を減らし、クラスに最適な座席表を一瞬で作成します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/app"
                className="group flex items-center gap-2 bg-gradient-to-r from-wood-600 to-wood-800 hover:from-wood-700 hover:to-wood-900 text-white text-lg font-medium px-10 py-5 rounded-full transition-all duration-300 shadow-xl shadow-wood-800/20 hover:shadow-2xl hover:shadow-wood-800/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                無料でアプリを使う
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ② 課題提起セクション */}
        <section className="py-28 px-6 bg-white relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-wood-200 to-transparent"></div>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-wood-800 mb-6">
                こんなお悩み、ありませんか？
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-wood-50/50 p-8 rounded-[2rem] border border-wood-100 relative overflow-hidden group hover:bg-wood-50 transition-colors duration-500">
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-wood-200/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-wood-600">
                    <FileSpreadsheet className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-wood-800 mb-3">手作業の限界</h4>
                    <p className="text-wood-600 leading-relaxed text-lg">
                      「席替えのたびにExcelのセルを使用しながら手動で時間がかかる…」
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-wood-50/50 p-8 rounded-[2rem] border border-wood-100 relative overflow-hidden group hover:bg-wood-50 transition-colors duration-500">
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-wood-200/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-wood-600">
                    <HeartHandshake className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-wood-800 mb-3">複雑な配慮の管理</h4>
                    <p className="text-wood-600 leading-relaxed text-lg">
                      「配慮が必要な生徒の組み合わせを、毎回メモで管理している…」
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ③ 機能紹介セクション */}
        <section className="py-28 px-6 bg-wood-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-wood-800 mb-4">
                Seat Tree でできること
              </h3>
              <p className="text-wood-600 text-lg">先生の業務を効率化する4つの機能</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckCircle2,
                  title: 'ワンクリック席替え',
                  desc: '条件を考慮した上で、ランダムな席替えを瞬時に実行します。',
                },
                {
                  icon: Users,
                  title: '名簿管理',
                  desc: 'クラスの生徒名簿を簡単に登録・編集・管理できます。',
                },
                {
                  icon: Settings2,
                  title: '配慮関係の設定',
                  desc: '視力や人間関係などの特別な配慮事項を事前に設定可能。',
                },
                {
                  icon: Printer,
                  title: '履歴保存・印刷',
                  desc: '過去の席替え履歴を保存し、そのまま綺麗に印刷できます。',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-[2rem] shadow-sm border border-wood-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-wood-200/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-wood-100 text-wood-700 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-wood-800 mb-3">{feature.title}</h4>
                  <p className="text-wood-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ④ 使い方の流れ */}
        <section className="py-28 px-6 bg-white overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-wood-800 mb-4">
                使い方の流れ
              </h3>
              <p className="text-wood-600 text-lg">直感的に操作できる4ステップ</p>
            </div>

            <div className="relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-wood-200/60 z-0"></div>

              <div className="grid md:grid-cols-4 gap-12 md:gap-6 relative z-10 w-full">
                {[
                  { step: '01', title: '名簿登録', desc: '生徒の情報を入力' },
                  { step: '02', title: '配慮設定', desc: '特別な条件を追加' },
                  { step: '03', title: '席替え実行', desc: 'ワンクリックで配置' },
                  { step: '04', title: '印刷・保存', desc: 'そのまま出力して完了' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-row md:flex-col items-center gap-6 md:text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-wood-100 flex items-center justify-center shadow-lg relative group cursor-default">
                      <div className="absolute inset-0 bg-wood-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                      <span className="font-serif text-2xl font-bold text-wood-500 group-hover:text-white relative z-10 transition-colors duration-300">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-wood-800 mb-2">{item.title}</h4>
                      <p className="text-wood-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ⑤ よくある質問（FAQ） */}
        <section className="py-28 px-6 bg-wood-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-wood-800 mb-4 flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-wood-600" />
                よくある質問
              </h3>
            </div>
            <div className="space-y-6">
              {[
                {
                  q: '無料で使えますか？',
                  a: 'はい、基本的な機能はすべて無料でご利用いただけます。課金なしで席替えの作成や保存が可能です。',
                },
                {
                  q: 'データはどこに保存されますか？',
                  a: 'ブラウザのローカル内（お使いの端末）、またはログインした場合はクラウド環境に安全に保存されます。',
                },
                {
                  q: 'スマホでも使えますか？',
                  a: 'はい、スマートフォンでもご利用いただけますが、名簿の作成や配慮設定などの操作はPCまたはタブレットでの利用を推奨しています。',
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-wood-100 hover:border-wood-300 transition-colors"
                >
                  <h4 className="text-lg font-bold text-wood-800 mb-3 flex items-start gap-4">
                    <span className="text-wood-400 font-serif text-2xl leading-none mt-1">Q.</span>
                    <span className="pt-0.5">{faq.q}</span>
                  </h4>
                  <div className="text-wood-600 leading-relaxed flex items-start gap-4">
                    <span className="text-wood-300 font-serif text-2xl leading-none mt-1 min-w-[28px]">
                      A.
                    </span>
                    <span className="pt-0.5">{faq.a}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ⑥ フッター */}
      <footer className="bg-wood-900 pt-16 pb-8 px-6 text-wood-300">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-wood-800 flex items-center justify-center text-wood-200 font-bold text-xl">
                S
              </div>
              <span className="font-bold font-serif text-2xl text-white">Seat Tree</span>
            </Link>
            <p className="text-sm text-wood-400">先生のための、配慮できる席替えアプリ</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-sm">
            <div className="flex flex-col gap-3 text-center md:text-left">
              <Link href="#" className="hover:text-white transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                利用規約
              </Link>
            </div>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2"
              >
                <span className="font-bold">𝕏</span> 開発者
              </a>
              <Link href="/contact" className="hover:text-white transition-colors">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto border-t border-wood-800 pt-8 text-center text-xs text-wood-500">
          &copy; {new Date().getFullYear()} Seat Tree. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
