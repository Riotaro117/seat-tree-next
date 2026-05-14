import { appFeatures } from './appFeatures';

const Introduction = () => {
  return (
    <section className="py-28 px-6 bg-wood-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-wood-800 mb-4">
            Seat Tree でできること
          </h3>
          <p className="text-wood-600 text-lg">
            先生の業務を効率化する
            <span className="px-0 sm:px-3 text-2xl text-emerald-700 font-bold">
              {appFeatures.length}個
            </span>
            の機能
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appFeatures.map((feature, i) => (
            <div
              key={i}
              className={`bg-white px-4 py-8 rounded-2xl shadow-sm border-2 ${feature.borderColor} hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[260px]`}
            >
              <h4
                className={`text-lg md:text-xl font-bold ${feature.color} mb-6 whitespace-pre-wrap leading-snug`}
              >
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
