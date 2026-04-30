import { Link } from "react-router-dom";
import { Member } from "@/lib/api";
import Icon from "@/components/ui/icon";

interface Props {
  member: Member;
  index?: number;
}

const FACEIT_COLORS: Record<number, string> = {
  1: "#EEEEEE", 2: "#EEEEEE", 3: "#F5A623",
  4: "#F5A623", 5: "#F5A623", 6: "#FFC200",
  7: "#FFC200", 8: "#FF6B00", 9: "#FF6B00", 10: "#AA0000",
};

const DEFAULT_AVATAR = "https://cdn.poehali.dev/files/dc2b3d93-3e55-4482-9c27-4be67e255e72.png";

export default function MemberCard({ member, index = 0 }: Props) {
  const winRate = member.matches_played > 0
    ? Math.round((member.matches_won / member.matches_played) * 100)
    : 0;
  const faceitColor = member.faceit_lvl ? FACEIT_COLORS[member.faceit_lvl] ?? "#888" : "#888";

  return (
    <Link
      to={`/roster/${member.id}`}
      className="group block bg-flux-card border border-flux-border rounded-xl overflow-hidden hover:border-flux-red transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,26,26,0.3)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Фото */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
        <img
          src={member.avatar_url ?? DEFAULT_AVATAR}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {/* Градиент снизу */}
        <div className="absolute inset-0 bg-gradient-to-t from-flux-card via-transparent to-transparent" />

        {/* Роль — верхний правый угол */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-oswald tracking-widest text-flux-red-glow border border-flux-red/30">
          {member.role}
        </div>

        {/* Faceit уровень — верхний левый угол */}
        {member.faceit_lvl && (
          <div
            className="absolute top-3 left-3 w-8 h-8 rounded flex items-center justify-center text-xs font-bold border"
            style={{ backgroundColor: faceitColor + "22", borderColor: faceitColor + "66", color: faceitColor }}
          >
            {member.faceit_lvl}
          </div>
        )}

        {/* Никнейм поверх фото снизу */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          {member.nickname && (
            <div className="font-oswald text-xl tracking-widest text-white text-glow leading-tight">
              {member.nickname}
            </div>
          )}
          <div className="text-gray-400 text-xs">{member.name}</div>
        </div>
      </div>

      {/* Статистика */}
      <div className="px-4 pt-3 pb-4 space-y-3">

        {/* Блок 1 — Faceit / K/D */}
        <div className="grid grid-cols-3 gap-2 border-b border-flux-border pb-3">
          <div className="text-center">
            <div className="font-oswald text-base leading-tight" style={{ color: faceitColor }}>
              {member.faceit_lvl ?? "—"}
            </div>
            <div className="text-gray-600 text-[10px] tracking-widest font-oswald mt-0.5">LVL</div>
          </div>
          <div className="text-center">
            <div className="font-oswald text-base leading-tight text-white">
              {member.faceit_elo ?? "—"}
            </div>
            <div className="text-gray-600 text-[10px] tracking-widest font-oswald mt-0.5">ELO</div>
          </div>
          <div className="text-center">
            <div className={`font-oswald text-base leading-tight ${member.kd_ratio && member.kd_ratio >= 1 ? "text-green-400" : "text-red-400"}`}>
              {member.kd_ratio ?? "—"}
            </div>
            <div className="text-gray-600 text-[10px] tracking-widest font-oswald mt-0.5">K/D</div>
          </div>
        </div>

        {/* Блок 2 — Матчи / Победы / Винрейт */}
        <div className="grid grid-cols-3 gap-2 border-b border-flux-border pb-3">
          <div className="text-center">
            <div className="font-oswald text-base text-white leading-tight">{member.matches_played}</div>
            <div className="text-gray-600 text-[10px] tracking-widest font-oswald mt-0.5">МАТЧЕЙ</div>
          </div>
          <div className="text-center">
            <div className="font-oswald text-base text-white leading-tight">{member.matches_won}</div>
            <div className="text-gray-600 text-[10px] tracking-widest font-oswald mt-0.5">ПОБЕД</div>
          </div>
          <div className="text-center">
            <div className={`font-oswald text-base leading-tight ${winRate >= 50 ? "text-green-400" : "text-red-400"}`}>
              {member.matches_played > 0 ? `${winRate}%` : "—"}
            </div>
            <div className="text-gray-600 text-[10px] tracking-widest font-oswald mt-0.5">ВИНРЕЙТ</div>
          </div>
        </div>

        {/* Блок 3 — Оружие + девиз */}
        <div className="space-y-1.5">
          {member.favorite_weapon && (
            <div className="flex items-center gap-2 text-xs">
              <Icon name="Crosshair" size={11} className="text-flux-red/60 flex-shrink-0" />
              <span className="text-gray-400 truncate">{member.favorite_weapon}</span>
            </div>
          )}
          {member.motto && (
            <div className="flex items-start gap-2 text-xs">
              <Icon name="Quote" size={11} className="text-flux-red/60 flex-shrink-0 mt-0.5" />
              <span className="text-gray-500 italic line-clamp-2 leading-tight">{member.motto}</span>
            </div>
          )}
        </div>

      </div>
    </Link>
  );
}
