import { FileSpreadsheet, HeartHandshake } from 'lucide-react';

const Problem = () => {
  return (
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
                  「席替えのたびにExcelのセルを使用しながら手動で時間がかかるうえ、完全にランダムにできない…」
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
                <p className="text-wood-600 leading-relaxed text-lg">
                  「席替えをした後に、配慮が必要な生徒がいたことに気がつく… 」
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
