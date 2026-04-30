import { useEffect, useState } from "react";
import { achievementsApi, Achievement } from "@/lib/api";
import Icon from "@/components/ui/icon";

const PLACE_MAP: Record<string, { emoji: string; label: string; color: string }> = {
  "1": { emoji: "🥇", label: "1 место", color: "border-yellow-700/40 bg-yellow-900/10" },
  "2": { emoji: "🥈", label: "2 место", color: "border-gray-600/40 bg-gray-800/20" },
  "3": { emoji: "🥉", label: "3 место", color: "border-orange-800/40 bg-orange-900/10" },
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<"all" | "team" | "personal">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    achievementsApi.getAll().then((data) => {
      setAchievements(data);
      setLoading(false);
    });
  }, []);

  const filtered = achievements.filter((a) => {
    if (filter === "team") return a.is_team;
    if (filter === "personal") return !a.is_team;
    return true;
  });

  const teamCount = achievements.filter((a) => a.is_team).length;
  const personalCount = achievements.filter((a) => !a.is_team).length;
  const firstPlaces = achievements.filter((a) => a.place === "1").length;

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

      {/* Stats */}
      <section className="pb-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { value: firstPlaces, label: "ПЕРВЫХ МЕСТ", icon: "Trophy" },
            { value: teamCount, label: "КОМАНДНЫХ", icon: "Users" },
            { value: personalCount, label: "ЛИЧНЫХ", icon: "Star" },
          ].map((s) => (
            <div key={s.label} className="bg-flux-card border border-flux-border rounded-lg p-5 text-center">
              <Icon name={s.icon as "Trophy"} size={24} className="text-flux-red/60 mx-auto mb-2" />
              <div className="font-oswald text-3xl text-flux-red-glow">{s.value}</div>
              <div className="font-oswald text-xs text-gray-500 tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-8">
          {(["all", "team", "personal"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 font-oswald text-sm tracking-widest rounded transition-colors ${
                filter === f
                  ? "bg-flux-red text-white"
                  : "bg-flux-card border border-flux-border text-gray-400 hover:text-white hover:border-flux-red"
              }`}
            >
              {f === "all" ? "ВСЕ" : f === "team" ? "КОМАНДНЫЕ" : "ЛИЧНЫЕ"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 bg-flux-card border border-flux-border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <div className="font-oswald text-2xl mb-2">НЕТ ДОСТИЖЕНИЙ</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((a) => {
              const placeInfo = a.place ? PLACE_MAP[a.place] : null;
              return (
                <div
                  key={a.id}
                  className={`bg-flux-card border rounded-lg p-6 hover:border-flux-red transition-all ${
                    placeInfo ? placeInfo.color : "border-flux-border"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">
                      {placeInfo?.emoji ?? "🏅"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="font-oswald text-white text-lg leading-tight">{a.title}</div>
                        <span
                          className={`flex-shrink-0 text-xs font-oswald tracking-widest px-2 py-0.5 rounded border ${
                            a.is_team
                              ? "border-flux-red/30 text-flux-red-glow bg-flux-red/5"
                              : "border-gray-700 text-gray-500 bg-gray-900/30"
                          }`}
                        >
                          {a.is_team ? "КОМАНДА" : "ЛИЧНОЕ"}
                        </span>
                      </div>
                      {a.tournament && (
                        <div className="text-gray-500 text-sm">{a.tournament}</div>
                      )}
                      {!a.is_team && a.member_name && (
                        <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                          <Icon name="User" size={12} />
                          {a.member_nickname ?? a.member_name}
                        </div>
                      )}
                      {a.description && (
                        <p className="text-gray-600 text-sm mt-2">{a.description}</p>
                      )}
                      {a.date && (
                        <div className="text-gray-600 text-xs mt-2 flex items-center gap-1">
                          <Icon name="Calendar" size={11} />
                          {new Date(a.date).toLocaleDateString("ru-RU", { year: "numeric", month: "long" })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <footer className="py-10 text-center border-t border-flux-border mt-10">
        <div className="font-oswald text-2xl text-flux-red-glow tracking-widest mb-2">TEAM FLUX</div>
        <div className="text-gray-600 text-sm">© {new Date().getFullYear()} Team Flux. Все права защищены.</div>
      </footer>
    </div>
  );
}
