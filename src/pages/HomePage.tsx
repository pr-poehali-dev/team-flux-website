import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { membersApi, achievementsApi, Member, Achievement } from "@/lib/api";
import MemberCard from "@/components/MemberCard";
import Icon from "@/components/ui/icon";

export default function HomePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    membersApi.getAll().then(setMembers);
    achievementsApi.getAll({ is_team: true }).then((data) => setAchievements(data.slice(0, 3)));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise stripe-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-flux-dark via-flux-dark/95 to-flux-dark" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #8B1A1A 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-flux-red/10 border border-flux-red/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-flux-red-glow rounded-full animate-pulse" />
            <span className="text-flux-red-glow text-sm font-oswald tracking-widest">
              КИБЕРСПОРТИВНАЯ КОМАНДА
            </span>
          </div>

          <h1 className="font-oswald text-7xl md:text-9xl text-white tracking-widest mb-4 animate-fade-in-up text-glow">
            TEAM
            <br />
            <span className="text-flux-red-glow">FLUX</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 animate-fade-in-up delay-200">
            Профессиональная команда, созданная для победы. Мы не просто играем — мы доминируем.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              to="/roster"
              className="px-8 py-3 bg-flux-red hover:bg-flux-red-bright text-white font-oswald tracking-widest rounded transition-all glow-red-sm"
            >
              СМОТРЕТЬ СОСТАВ
            </Link>
            <Link
              to="/achievements"
              className="px-8 py-3 border border-flux-red/50 hover:border-flux-red text-flux-red-glow font-oswald tracking-widest rounded transition-all hover:bg-flux-red/5"
            >
              ДОСТИЖЕНИЯ
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-flux-red/50" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-flux-card border-y border-flux-border">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: members.length, label: "ИГРОКОВ" },
            { value: achievements.filter((a) => a.place === "1").length + 3, label: "ПОБЕД" },
            { value: "2020", label: "ГОД ОСНОВАНИЯ" },
            { value: achievements.length + 2, label: "ТУРНИРОВ" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-oswald text-4xl md:text-5xl text-flux-red-glow mb-1">{s.value}</div>
              <div className="font-oswald text-xs text-gray-500 tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team preview */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-flux-red text-sm font-oswald tracking-widest mb-2">// СОСТАВ</div>
            <h2 className="font-oswald text-4xl text-white">НАША КОМАНДА</h2>
          </div>
          <Link
            to="/roster"
            className="flex items-center gap-2 text-flux-red-glow hover:text-white transition-colors font-oswald text-sm tracking-widest"
          >
            ВСЕ ИГРОКИ <Icon name="ArrowRight" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {members.slice(0, 5).map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>
      </section>

      {/* Achievements preview */}
      <section className="py-20 bg-flux-card/30 border-y border-flux-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-flux-red text-sm font-oswald tracking-widest mb-2">// ДОСТИЖЕНИЯ</div>
              <h2 className="font-oswald text-4xl text-white">НАШИ ПОБЕДЫ</h2>
            </div>
            <Link
              to="/achievements"
              className="flex items-center gap-2 text-flux-red-glow hover:text-white transition-colors font-oswald text-sm tracking-widest"
            >
              ВСЕ <Icon name="ArrowRight" size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((a) => (
              <div
                key={a.id}
                className="bg-flux-card border border-flux-border rounded-lg p-6 hover:border-flux-red transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-flux-red/10 border border-flux-red/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-oswald text-flux-red-glow text-xl">
                      {a.place === "1" ? "🥇" : a.place === "2" ? "🥈" : "🏆"}
                    </span>
                  </div>
                  <div>
                    <div className="font-oswald text-white text-lg">{a.title}</div>
                    <div className="text-gray-500 text-sm mt-1">{a.tournament}</div>
                    {a.date && (
                      <div className="text-gray-600 text-xs mt-2">
                        {new Date(a.date).toLocaleDateString("ru-RU", { year: "numeric", month: "long" })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-flux-border">
        <div className="font-oswald text-2xl text-flux-red-glow tracking-widest mb-2">TEAM FLUX</div>
        <div className="text-gray-600 text-sm">© {new Date().getFullYear()} Team Flux. Все права защищены.</div>
      </footer>
    </div>
  );
}
