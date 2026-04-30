import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

export default function AchievementsPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 60% at 50% 30%, #8B1A1A 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-flux-red text-sm font-oswald tracking-widest mb-3">// ДОСТИЖЕНИЯ</div>
          <h1 className="font-oswald text-6xl md:text-7xl text-white mb-4">
            НАШИ <span className="text-flux-red-glow text-glow">ПОБЕДЫ</span>
          </h1>
          <p className="text-gray-500 max-w-xl">
            Каждый трофей — результат упорной работы, слаженной игры и несгибаемого духа команды.
          </p>
        </div>
      </section>

      <section className="pb-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[
            { value: "0", label: "ПЕРВЫХ МЕСТ", icon: "Trophy" },
            { value: "0", label: "КОМАНДНЫХ", icon: "Users" },
            { value: "1", label: "ТУРНИРОВ", icon: "Swords" },
          ].map((s) => (
            <div key={s.label} className="bg-flux-card border border-flux-border rounded-lg p-5 text-center">
              <Icon name={s.icon as "Trophy"} size={24} className="text-flux-red/60 mx-auto mb-2" />
              <div className="font-oswald text-3xl text-flux-red-glow">{s.value}</div>
              <div className="font-oswald text-xs text-gray-500 tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center py-20 border border-flux-border/40 rounded-2xl bg-flux-card/20">
          <div className="w-20 h-20 rounded-full bg-flux-red/10 border border-flux-red/20 flex items-center justify-center mb-6">
            <Icon name="Trophy" size={36} className="text-flux-red/50" />
          </div>
          <div className="font-oswald text-3xl text-white mb-3 tracking-widest">ИСТОРИЯ ТОЛЬКО НАЧИНАЕТСЯ</div>
          <p className="text-gray-500 text-center max-w-sm leading-relaxed mb-8">
            Мы основаны в 2026 году и уже участвовали в первом турнире. Впереди — большие победы. Следите за обновлениями.
          </p>
          <Link
            to="/roster"
            className="flex items-center gap-2 px-6 py-3 bg-flux-red hover:bg-flux-red-bright text-white font-oswald text-sm tracking-widest rounded transition-colors"
          >
            <Icon name="Users" size={16} />
            ПОЗНАКОМИТЬСЯ С КОМАНДОЙ
          </Link>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-flux-border mt-4">
        <div className="font-oswald text-2xl text-flux-red-glow tracking-widest mb-2">TEAM FLUX</div>
        <div className="text-gray-600 text-sm">© {new Date().getFullYear()} Team Flux. Все права защищены.</div>
      </footer>
    </div>
  );
}
