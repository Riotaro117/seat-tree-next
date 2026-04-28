import { CheckCircle2, Users, Settings2, Printer } from 'lucide-react';
const Introduction = () => {
  return (
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
  );
};

export default Introduction;
