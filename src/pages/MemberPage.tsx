import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { membersApi, Member, Achievement } from "@/lib/api";
import Icon from "@/components/ui/icon";

export default function MemberPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    membersApi.getById(Number(id)).then(({ member, achievements }) => {
      setMember(member);
      setAchievements(achievements);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-flux-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="font-oswald text-4xl text-flux-red-glow mb-4">404</div>
          <p className="text-gray-500">Игрок не найден</p>
          <Link to="/roster" className="text-flux-red-glow mt-4 inline-block hover:underline">← Вернуться к составу</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(ellipse 50% 80% at 30% 50%, #8B1A1A 0%, transparent 70%)" }}
        />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <Link to="/roster" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-oswald text-sm tracking-widest mb-8">
            <Icon name="ArrowLeft" size={16} />
            СОСТАВ
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-48 flex-shrink-0 bg-gradient-to-br from-red-900 to-red-700 rounded-lg border border-flux-red/30 overflow-hidden glow-red">
              <img
                src={member.avatar_url ?? "https://cdn.poehali.dev/files/dc2b3d93-3e55-4482-9c27-4be67e255e72.png"}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex-1">
              {member.nickname && (
                <div className="font-oswald text-flux-red-glow text-4xl tracking-widest text-glow mb-1">
                  {member.nickname}
                </div>
              )}
              <h1 className="font-oswald text-3xl text-white mb-2">{member.name}</h1>
              <div className="inline-block bg-flux-red/10 border border-flux-red/30 rounded px-3 py-1 text-flux-red-glow font-oswald text-sm tracking-widest mb-4">
                {member.role}
              </div>

              {member.bio && (
                <p className="text-gray-400 leading-relaxed max-w-xl mb-6">{member.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {member.join_date && (
                  <div className="flex items-center gap-1.5">
                    <Icon name="Calendar" size={14} className="text-flux-red/60" />
                    В команде с {new Date(member.join_date).toLocaleDateString("ru-RU", { year: "numeric", month: "long" })}
                  </div>
                )}
                {member.social_vk && (
                  <a href={member.social_vk} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Icon name="ExternalLink" size={14} />
                    VK
                  </a>
                )}
                {member.social_tg && (
                  <a href={member.social_tg} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                    <Icon name="Send" size={14} />
                    Telegram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {achievements.length > 0 && (
        <section className="pb-20 max-w-5xl mx-auto px-4">
          <div className="text-flux-red text-sm font-oswald tracking-widest mb-3">// ДОСТИЖЕНИЯ</div>
          <h2 className="font-oswald text-3xl text-white mb-6">ЛИЧНЫЕ НАГРАДЫ</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div key={a.id} className="bg-flux-card border border-flux-border rounded-lg p-5 hover:border-flux-red transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{a.place === "1" ? "🥇" : a.place === "2" ? "🥈" : "🏆"}</span>
                  <div>
                    <div className="font-oswald text-white">{a.title}</div>
                    {a.tournament && <div className="text-gray-500 text-sm">{a.tournament}</div>}
                    {a.description && <div className="text-gray-600 text-sm mt-1">{a.description}</div>}
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
        </section>
      )}

      <footer className="py-10 text-center border-t border-flux-border">
        <div className="font-oswald text-2xl text-flux-red-glow tracking-widest mb-2">TEAM FLUX</div>
        <div className="text-gray-600 text-sm">© {new Date().getFullYear()} Team Flux. Все права защищены.</div>
      </footer>
    </div>
  );
}