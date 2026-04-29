import { HelpCircle } from 'lucide-react';

const QandA = () => {
  return (
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
              a: 'はい、すべて無料でご利用いただけます。ただし、セキュリティの都合上、ユーザー登録をしないと全ての機能が使えません。',
            },
            {
              q: '生徒の情報を安全に使用できますか？',
              a: 'はい。このアプリでは、生徒の名前などの個人情報をデータベースに安全に保管しています。データへのアクセスにはログインが必要なため、関係者以外が情報を見ることはできない仕組みになっています。',
            },
            {
              q: 'データはどこに保存されますか？',
              a: '全てクラウド環境に安全に保存されます。',
            },
            {
              q: 'スマホでも使えますか？',
              a: 'はい、スマートフォンでもご利用いただけますが、表示領域の都合上、PCまたはタブレットでの利用を推奨しています。',
            },
            {
              q: 'コの字型の教室の座席でも利用できますか？',
              a: 'はい。コの字型の座席などは使用しない座席を設定することによって利用することができます。',
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
  );
};

export default QandA;
