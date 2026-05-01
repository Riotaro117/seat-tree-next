
const Flow = () => {
  return (
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
              <div key={i} className="flex flex-row md:flex-col items-center gap-6 md:text-center">
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
  );
};

export default Flow;
