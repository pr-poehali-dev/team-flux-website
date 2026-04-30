import { Link } from "react-router-dom";
import { Member } from "@/lib/api";
import Icon from "@/components/ui/icon";

interface Props {
  member: Member;
  index?: number;
}

const AVATAR_COLORS = [
  "from-red-900 to-red-700",
  "from-rose-900 to-red-800",
  "from-red-800 to-orange-900",
  "from-red-900 to-rose-700",
  "from-rose-800 to-red-900",
];

export default function MemberCard({ member, index = 0 }: Props) {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <Link
      to={`/roster/${member.id}`}
      className="group block bg-flux-card border border-flux-border rounded-lg overflow-hidden hover:border-flux-red transition-all duration-300 hover:glow-red-sm"
    >
      <div className={`relative h-48 bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
        {member.avatar_url ? (
          <img
            src={member.avatar_url}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-black/30 border-2 border-flux-red/40 flex items-center justify-center mx-auto mb-2">
              <span className="font-oswald text-3xl text-white/70">
                {member.nickname?.[0] ?? member.name[0]}
              </span>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-oswald tracking-widest text-flux-red-glow border border-flux-red/30">
          {member.role}
        </div>
      </div>

      <div className="p-4">
        {member.nickname && (
          <div className="font-oswald text-flux-red-glow text-lg tracking-widest mb-0.5">
            {member.nickname}
          </div>
        )}
        <div className="font-medium text-white group-hover:text-flux-red-glow transition-colors">
          {member.name}
        </div>
        {member.bio && (
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{member.bio}</p>
        )}

        <div className="flex items-center gap-3 mt-3">
          {member.social_vk && (
            <a
              href={member.social_vk}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              <Icon name="ExternalLink" size={14} />
            </a>
          )}
          {member.social_tg && (
            <a
              href={member.social_tg}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-sky-400 transition-colors"
            >
              <Icon name="Send" size={14} />
            </a>
          )}
          {member.join_date && (
            <span className="text-gray-600 text-xs ml-auto flex items-center gap-1">
              <Icon name="Calendar" size={12} />
              {new Date(member.join_date).getFullYear()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
