import { useEffect, useState } from "react";
import { membersApi, Member } from "@/lib/api";
import MemberCard from "@/components/MemberCard";

export default function RosterPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    membersApi.getAll(true).then((data) => {
      setMembers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-8"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 60% at 80% 40%, #8B1A1A 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-flux-red text-sm font-oswald tracking-widest mb-3">// СОСТАВ</div>
          <h1 className="font-oswald text-6xl md:text-7xl text-white mb-4">
            НАШИ <span className="text-flux-red-glow text-glow">ИГРОКИ</span>
          </h1>
          <p className="text-gray-500 max-w-xl">
            Каждый игрок Team Flux — специалист в своей роли. Вместе мы непобедимы.
          </p>
        </div>
      </section>

      <section className="pb-20 max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-flux-card border border-flux-border rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <div className="font-oswald text-2xl mb-2">СОСТАВ ПОКА ПУСТ</div>
            <p className="text-sm">Добавьте участников через панель управления</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {members.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} />
            ))}
          </div>
        )}
      </section>

      <footer className="py-10 text-center border-t border-flux-border">
        <div className="font-oswald text-2xl text-flux-red-glow tracking-widest mb-2">TEAM FLUX</div>
        <div className="text-gray-600 text-sm">© {new Date().getFullYear()} Team Flux. Все права защищены.</div>
      </footer>
    </div>
  );
}
