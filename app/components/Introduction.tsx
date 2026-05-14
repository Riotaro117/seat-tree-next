import { Sparkles, MousePointerClick, FileSpreadsheet, LayoutGrid, History, Printer } from 'lucide-react';

const Introduction = () => {
  return (
    <section className="py-28 px-6 bg-wood-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-wood-800 mb-4">
            Seat Tree でできること
          </h3>
          <p className="text-wood-600 text-lg">先生の業務を効率化する6つの機能</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: '自動席替え生成',
              desc: '配慮条件を考慮した\n最適な座席を自動作成',
              color: 'text-emerald-700',
              borderColor: 'border-emerald-200',
              iconColor: 'text-yellow-200',
            },
            {
              icon: MousePointerClick,
              title: 'ドラッグ＆ドロップで\nかんたん調整',
              desc: '直感的な操作で\nらくらく微調整',
              color: 'text-blue-700',
              borderColor: 'border-blue-200',
              iconColor: 'text-amber-500',
            },
            {
              icon: FileSpreadsheet,
              title: 'Excelから\n名簿を一括登録',
              desc: '学校の名簿データを\nそのまま活用',
              color: 'text-orange-500',
              borderColor: 'border-orange-200',
              iconColor: 'text-green-600',
            },
            {
              icon: LayoutGrid,
              title: '教室レイアウトを\n自由にカスタマイズ',
              desc: '列数・行数や前列範囲も\n自由に設定可能',
              color: 'text-emerald-800',
              borderColor: 'border-green-200',
              iconColor: 'text-green-500',
            },
            {
              icon: History,
              title: '履歴を保存・管理',
              desc: '過去の席替えを保存して\nいつでも確認',
              color: 'text-purple-700',
              borderColor: 'border-purple-200',
              iconColor: 'text-gray-700',
            },
            {
              icon: Printer,
              title: '印刷・PDF出力',
              desc: 'そのまま印刷できる\nきれいな座席表',
              color: 'text-blue-800',
              borderColor: 'border-blue-200',
              iconColor: 'text-gray-800',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`bg-white px-4 py-8 rounded-2xl shadow-sm border-2 ${feature.borderColor} hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[260px]`}
            >
              <h4 className={`text-lg md:text-xl font-bold ${feature.color} mb-6 whitespace-pre-wrap leading-snug`}>
                {feature.title}
              </h4>
              <div className="flex-1 flex items-center justify-center mb-6">
                <feature.icon className={`w-16 h-16 ${feature.iconColor}`} strokeWidth={1.5} />
              </div>
              <p className="text-gray-800 text-sm md:text-sm font-medium whitespace-pre-wrap leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
