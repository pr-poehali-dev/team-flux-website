import Icon from "@/components/ui/icon";

const values = [
  { icon: "Flame", title: "ПОБЕДНЫЙ ДУХ", desc: "Мы выходим на поле с единственной целью — победить. Каждый матч, каждый раунд." },
  { icon: "Users", title: "КОМАНДНАЯ ИГРА", desc: "Синергия — наша сила. Пять умов, одно движение, один результат." },
  { icon: "Target", title: "ТОЧНОСТЬ", desc: "Стратегия и холодный расчёт. Каждое решение выверено до миллисекунды." },
  { icon: "TrendingUp", title: "РАЗВИТИЕ", desc: "Мы постоянно растём, анализируем ошибки и становимся лучше после каждого турнира." },
];

const history = [
  { year: "2020", event: "Основание Team Flux. Первый состав из 3 игроков." },
  { year: "2021", event: "Расширение состава до 5 человек. Первый региональный турнир." },
  { year: "2022", event: "Первая крупная победа. Признание в местном сообществе." },
  { year: "2023", event: "Кубок города — 2 место. Выход на новый уровень." },
  { year: "2024", event: "Чемпионат региона — 1 место. Лучший сезон в истории." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 20% 50%, #8B1A1A 0%, transparent 60%)" }}
        />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-flux-red text-sm font-oswald tracking-widest mb-3">// О КОМАНДЕ</div>
          <h1 className="font-oswald text-6xl md:text-7xl text-white mb-6">
            МЫ — <span className="text-flux-red-glow text-glow">FLUX</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Team Flux — это не просто команда. Это братство людей, объединённых страстью к игре и жаждой победы.
            Мы были основаны в 2020 году и с тех пор прошли долгий путь от дружеских матчей до серьёзных турниров.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-flux-card/30 border-y border-flux-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-flux-red text-sm font-oswald tracking-widest mb-3">// ЦЕННОСТИ</div>
          <h2 className="font-oswald text-4xl text-white mb-10">ЧТО НАС ДВИЖЕТ</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-flux-card border border-flux-border rounded-lg p-6 hover:border-flux-red transition-colors group">
                <div className="w-12 h-12 bg-flux-red/10 border border-flux-red/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-flux-red/20 transition-colors">
                  <Icon name={v.icon} fallback="Star" size={22} className="text-flux-red-glow" />
                </div>
                <div className="font-oswald text-white text-lg mb-2">{v.title}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-flux-red text-sm font-oswald tracking-widest mb-3">// ИСТОРИЯ</div>
        <h2 className="font-oswald text-4xl text-white mb-12">НАШЕ РАЗВИТИЕ</h2>

        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-px bg-flux-border" />
          <div className="space-y-8">
            {history.map((h) => (
              <div key={h.year} className="flex items-start gap-8 animate-fade-in-up">
                <div className="w-16 font-oswald text-2xl text-flux-red-glow flex-shrink-0 text-right">
                  {h.year}
                </div>
                <div className="relative pt-1">
                  <div className="absolute -left-4 top-2.5 w-3 h-3 rounded-full bg-flux-red border-2 border-flux-dark" />
                  <p className="text-gray-300 leading-relaxed pl-4">{h.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-r from-flux-red/5 to-transparent border-t border-flux-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-flux-red text-sm font-oswald tracking-widest mb-3">// МИССИЯ</div>
          <h2 className="font-oswald text-5xl text-white mb-6">НАША ЦЕЛЬ</h2>
          <p className="text-gray-400 text-xl leading-relaxed">
            Стать ведущей киберспортивной командой региона, представлять сообщество на крупнейших турнирах
            и вдохновлять новое поколение игроков своими победами и профессионализмом.
          </p>
          <div className="mt-10 inline-flex items-center gap-3 bg-flux-red/10 border border-flux-red/30 rounded-full px-6 py-3">
            <Icon name="Zap" size={18} className="text-flux-red-glow" />
            <span className="font-oswald text-flux-red-glow tracking-widest">FLUX — МОЩЬ. СКОРОСТЬ. ПОБЕДА.</span>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-flux-border">
        <div className="font-oswald text-2xl text-flux-red-glow tracking-widest mb-2">TEAM FLUX</div>
        <div className="text-gray-600 text-sm">© {new Date().getFullYear()} Team Flux. Все права защищены.</div>
      </footer>
    </div>
  );
}