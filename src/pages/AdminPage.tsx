import { useEffect, useState } from "react";
import { membersApi, achievementsApi, Member, Achievement } from "@/lib/api";
import Icon from "@/components/ui/icon";

type Tab = "members" | "achievements";

interface MemberForm {
  name: string;
  role: string;
  nickname: string;
  bio: string;
  avatar_url: string;
  social_vk: string;
  social_tg: string;
  join_date: string;
  is_active: boolean;
  sort_order: number;
  faceit_lvl: string;
  faceit_elo: string;
  kd_ratio: string;
  matches_played: string;
  matches_won: string;
  favorite_weapon: string;
  motto: string;
}

interface AchievementForm {
  title: string;
  description: string;
  date: string;
  place: string;
  tournament: string;
  is_team: boolean;
  member_id: string;
}

const emptyMember: MemberForm = {
  name: "", role: "", nickname: "", bio: "", avatar_url: "",
  social_vk: "", social_tg: "", join_date: "", is_active: true, sort_order: 0,
  faceit_lvl: "", faceit_elo: "", kd_ratio: "", matches_played: "0", matches_won: "0",
  favorite_weapon: "", motto: "",
};

const emptyAchievement: AchievementForm = {
  title: "", description: "", date: "", place: "", tournament: "", is_team: true, member_id: "",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("members");
  const [members, setMembers] = useState<Member[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [memberForm, setMemberForm] = useState<MemberForm>(emptyMember);
  const [achievementForm, setAchievementForm] = useState<AchievementForm>(emptyAchievement);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadData = () => {
    membersApi.getAll(false).then(setMembers);
    achievementsApi.getAll().then(setAchievements);
  };

  useEffect(() => { loadData(); }, []);

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  };

  const openMemberEdit = (m: Member) => {
    setEditingMember(m);
    setMemberForm({
      name: m.name, role: m.role, nickname: m.nickname ?? "",
      bio: m.bio ?? "", avatar_url: m.avatar_url ?? "",
      social_vk: m.social_vk ?? "", social_tg: m.social_tg ?? "",
      join_date: m.join_date ? m.join_date.slice(0, 10) : "",
      is_active: m.is_active, sort_order: m.sort_order,
      faceit_lvl: m.faceit_lvl != null ? String(m.faceit_lvl) : "",
      faceit_elo: m.faceit_elo != null ? String(m.faceit_elo) : "",
      kd_ratio: m.kd_ratio != null ? String(m.kd_ratio) : "",
      matches_played: String(m.matches_played ?? 0),
      matches_won: String(m.matches_won ?? 0),
      favorite_weapon: m.favorite_weapon ?? "",
      motto: m.motto ?? "",
    });
    setShowMemberForm(true);
  };

  const openMemberCreate = () => {
    setEditingMember(null);
    setMemberForm(emptyMember);
    setShowMemberForm(true);
  };

  const saveMember = async () => {
    setLoading(true);
    const data = {
      ...memberForm,
      join_date: memberForm.join_date || null,
      sort_order: Number(memberForm.sort_order),
      faceit_lvl: memberForm.faceit_lvl ? Number(memberForm.faceit_lvl) : null,
      faceit_elo: memberForm.faceit_elo ? Number(memberForm.faceit_elo) : null,
      kd_ratio: memberForm.kd_ratio ? Number(memberForm.kd_ratio) : null,
      matches_played: Number(memberForm.matches_played) || 0,
      matches_won: Number(memberForm.matches_won) || 0,
    };
    if (editingMember) {
      await membersApi.update(editingMember.id, data);
      notify("Участник обновлён");
    } else {
      await membersApi.create(data);
      notify("Участник добавлен");
    }
    setShowMemberForm(false);
    loadData();
    setLoading(false);
  };

  const deactivateMember = async (m: Member) => {
    await membersApi.deactivate(m.id);
    notify("Участник деактивирован");
    loadData();
  };

  const openAchievementEdit = (a: Achievement) => {
    setEditingAchievement(a);
    setAchievementForm({
      title: a.title, description: a.description ?? "",
      date: a.date ? a.date.slice(0, 10) : "",
      place: a.place ?? "", tournament: a.tournament ?? "",
      is_team: a.is_team, member_id: a.member_id ? String(a.member_id) : "",
    });
    setShowAchievementForm(true);
  };

  const openAchievementCreate = () => {
    setEditingAchievement(null);
    setAchievementForm(emptyAchievement);
    setShowAchievementForm(true);
  };

  const saveAchievement = async () => {
    setLoading(true);
    const data = {
      ...achievementForm,
      date: achievementForm.date || null,
      member_id: achievementForm.member_id ? Number(achievementForm.member_id) : null,
    };
    if (editingAchievement) {
      await achievementsApi.update(editingAchievement.id, data);
      notify("Достижение обновлено");
    } else {
      await achievementsApi.create(data);
      notify("Достижение добавлено");
    }
    setShowAchievementForm(false);
    loadData();
    setLoading(false);
  };

  const inputCls = "w-full bg-flux-dark border border-flux-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-flux-red transition-colors placeholder:text-gray-600";
  const labelCls = "block text-gray-500 text-xs font-oswald tracking-widest mb-1";

  return (
    <div className="min-h-screen pt-16 pb-20">
      {msg && (
        <div className="fixed top-20 right-4 z-50 bg-flux-red text-white font-oswald text-sm px-4 py-2 rounded shadow-lg animate-fade-in">
          {msg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-flux-red text-sm font-oswald tracking-widest mb-2">// ПАНЕЛЬ</div>
        <h1 className="font-oswald text-4xl text-white mb-8">УПРАВЛЕНИЕ КОМАНДОЙ</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["members", "achievements"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 font-oswald text-sm tracking-widest rounded transition-colors ${
                tab === t ? "bg-flux-red text-white" : "bg-flux-card border border-flux-border text-gray-400 hover:text-white"
              }`}
            >
              {t === "members" ? "УЧАСТНИКИ" : "ДОСТИЖЕНИЯ"}
            </button>
          ))}
        </div>

        {/* Members Tab */}
        {tab === "members" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500 text-sm">{members.length} участников</div>
              <button
                onClick={openMemberCreate}
                className="flex items-center gap-2 px-4 py-2 bg-flux-red hover:bg-flux-red-bright text-white font-oswald text-sm tracking-widest rounded transition-colors"
              >
                <Icon name="Plus" size={16} />
                ДОБАВИТЬ
              </button>
            </div>

            <div className="bg-flux-card border border-flux-border rounded-lg overflow-hidden">
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-4 px-5 py-4 border-b border-flux-border last:border-0 hover:bg-white/2 transition-colors">
                  <div className="w-10 h-10 rounded bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center flex-shrink-0">
                    <span className="font-oswald text-white text-sm">{m.nickname?.[0] ?? m.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-oswald text-white">{m.nickname ?? m.name}</span>
                      {m.nickname && <span className="text-gray-500 text-sm">{m.name}</span>}
                      {!m.is_active && (
                        <span className="text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded font-oswald">НЕАКТИВЕН</span>
                      )}
                    </div>
                    <div className="text-gray-600 text-xs">{m.role}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openMemberEdit(m)}
                      className="p-2 text-gray-500 hover:text-white transition-colors"
                    >
                      <Icon name="Pencil" size={16} />
                    </button>
                    {m.is_active && (
                      <button
                        onClick={() => deactivateMember(m)}
                        className="p-2 text-gray-600 hover:text-red-400 transition-colors"
                      >
                        <Icon name="EyeOff" size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {members.length === 0 && (
                <div className="py-12 text-center text-gray-600 font-oswald">НЕТ УЧАСТНИКОВ</div>
              )}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {tab === "achievements" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500 text-sm">{achievements.length} достижений</div>
              <button
                onClick={openAchievementCreate}
                className="flex items-center gap-2 px-4 py-2 bg-flux-red hover:bg-flux-red-bright text-white font-oswald text-sm tracking-widest rounded transition-colors"
              >
                <Icon name="Plus" size={16} />
                ДОБАВИТЬ
              </button>
            </div>

            <div className="bg-flux-card border border-flux-border rounded-lg overflow-hidden">
              {achievements.map((a) => (
                <div key={a.id} className="flex items-center gap-4 px-5 py-4 border-b border-flux-border last:border-0 hover:bg-white/2 transition-colors">
                  <span className="text-xl flex-shrink-0">
                    {a.place === "1" ? "🥇" : a.place === "2" ? "🥈" : a.place === "3" ? "🥉" : "🏅"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-oswald text-white">{a.title}</div>
                    <div className="text-gray-600 text-xs flex items-center gap-3 mt-0.5">
                      <span>{a.is_team ? "Командное" : `Личное — ${a.member_nickname ?? a.member_name ?? "—"}`}</span>
                      {a.tournament && <span>{a.tournament}</span>}
                      {a.date && <span>{new Date(a.date).getFullYear()}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => openAchievementEdit(a)}
                    className="p-2 text-gray-500 hover:text-white transition-colors"
                  >
                    <Icon name="Pencil" size={16} />
                  </button>
                </div>
              ))}
              {achievements.length === 0 && (
                <div className="py-12 text-center text-gray-600 font-oswald">НЕТ ДОСТИЖЕНИЙ</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Member Form Modal */}
      {showMemberForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-flux-card border border-flux-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-flux-border">
              <h3 className="font-oswald text-xl text-white tracking-widest">
                {editingMember ? "РЕДАКТИРОВАТЬ" : "ДОБАВИТЬ УЧАСТНИКА"}
              </h3>
              <button onClick={() => setShowMemberForm(false)} className="text-gray-500 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>ИМЯ *</label>
                  <input className={inputCls} placeholder="Алексей Соколов" value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>РОЛЬ *</label>
                  <input className={inputCls} placeholder="Капитан" value={memberForm.role}
                    onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })} />
                </div>
              </div>

              <div>
                <label className={labelCls}>НИКНЕЙМ</label>
                <input className={inputCls} placeholder="SOKOL" value={memberForm.nickname}
                  onChange={(e) => setMemberForm({ ...memberForm, nickname: e.target.value })} />
              </div>

              <div>
                <label className={labelCls}>О СЕБЕ</label>
                <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Краткое описание..."
                  value={memberForm.bio} onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })} />
              </div>

              <div>
                <label className={labelCls}>ССЫЛКА НА АВАТАР</label>
                <input className={inputCls} placeholder="https://..." value={memberForm.avatar_url}
                  onChange={(e) => setMemberForm({ ...memberForm, avatar_url: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>VK</label>
                  <input className={inputCls} placeholder="https://vk.com/..." value={memberForm.social_vk}
                    onChange={(e) => setMemberForm({ ...memberForm, social_vk: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>TELEGRAM</label>
                  <input className={inputCls} placeholder="https://t.me/..." value={memberForm.social_tg}
                    onChange={(e) => setMemberForm({ ...memberForm, social_tg: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>ДАТА ВСТУПЛЕНИЯ</label>
                  <input type="date" className={inputCls} value={memberForm.join_date}
                    onChange={(e) => setMemberForm({ ...memberForm, join_date: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>ПОРЯДОК</label>
                  <input type="number" className={inputCls} value={memberForm.sort_order}
                    onChange={(e) => setMemberForm({ ...memberForm, sort_order: Number(e.target.value) })} />
                </div>
              </div>

              <div className="border-t border-flux-border pt-4">
                <div className="font-oswald text-xs text-gray-500 tracking-widest mb-3">// СТАТИСТИКА</div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className={labelCls}>FACEIT LVL</label>
                    <input type="number" min="1" max="10" className={inputCls} placeholder="1-10"
                      value={memberForm.faceit_lvl}
                      onChange={(e) => setMemberForm({ ...memberForm, faceit_lvl: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>FACEIT ELO</label>
                    <input type="number" className={inputCls} placeholder="1500"
                      value={memberForm.faceit_elo}
                      onChange={(e) => setMemberForm({ ...memberForm, faceit_elo: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>K/D</label>
                    <input type="number" step="0.01" className={inputCls} placeholder="1.20"
                      value={memberForm.kd_ratio}
                      onChange={(e) => setMemberForm({ ...memberForm, kd_ratio: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className={labelCls}>МАТЧЕЙ СЫГРАНО</label>
                    <input type="number" className={inputCls} placeholder="0"
                      value={memberForm.matches_played}
                      onChange={(e) => setMemberForm({ ...memberForm, matches_played: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>ПОБЕД</label>
                    <input type="number" className={inputCls} placeholder="0"
                      value={memberForm.matches_won}
                      onChange={(e) => setMemberForm({ ...memberForm, matches_won: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>ЛЮБИМОЕ ОРУЖИЕ</label>
                    <input className={inputCls} placeholder="AK-47"
                      value={memberForm.favorite_weapon}
                      onChange={(e) => setMemberForm({ ...memberForm, favorite_weapon: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>ДЕВИЗ</label>
                    <input className={inputCls} placeholder="Цитата..."
                      value={memberForm.motto}
                      onChange={(e) => setMemberForm({ ...memberForm, motto: e.target.value })} />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setMemberForm({ ...memberForm, is_active: !memberForm.is_active })}
                  className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${memberForm.is_active ? "bg-flux-red" : "bg-gray-700"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${memberForm.is_active ? "translate-x-5" : ""}`} />
                </div>
                <span className="text-gray-400 text-sm font-oswald tracking-widest">АКТИВЕН В КОМАНДЕ</span>
              </label>
            </div>

            <div className="px-6 py-4 border-t border-flux-border flex gap-3 justify-end">
              <button onClick={() => setShowMemberForm(false)}
                className="px-5 py-2 border border-flux-border text-gray-400 hover:text-white font-oswald text-sm tracking-widest rounded transition-colors">
                ОТМЕНА
              </button>
              <button onClick={saveMember} disabled={loading || !memberForm.name || !memberForm.role}
                className="px-6 py-2 bg-flux-red hover:bg-flux-red-bright disabled:opacity-50 text-white font-oswald text-sm tracking-widest rounded transition-colors">
                {loading ? "..." : "СОХРАНИТЬ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Form Modal */}
      {showAchievementForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-flux-card border border-flux-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-flux-border">
              <h3 className="font-oswald text-xl text-white tracking-widest">
                {editingAchievement ? "РЕДАКТИРОВАТЬ" : "ДОБАВИТЬ ДОСТИЖЕНИЕ"}
              </h3>
              <button onClick={() => setShowAchievementForm(false)} className="text-gray-500 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={labelCls}>НАЗВАНИЕ *</label>
                <input className={inputCls} placeholder="Чемпионат региона 2024" value={achievementForm.title}
                  onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })} />
              </div>

              <div>
                <label className={labelCls}>ТУРНИР</label>
                <input className={inputCls} placeholder="Regional Championship 2024" value={achievementForm.tournament}
                  onChange={(e) => setAchievementForm({ ...achievementForm, tournament: e.target.value })} />
              </div>

              <div>
                <label className={labelCls}>ОПИСАНИЕ</label>
                <textarea className={`${inputCls} resize-none`} rows={2} value={achievementForm.description}
                  onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>ДАТА</label>
                  <input type="date" className={inputCls} value={achievementForm.date}
                    onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>МЕСТО</label>
                  <select className={inputCls} value={achievementForm.place}
                    onChange={(e) => setAchievementForm({ ...achievementForm, place: e.target.value })}>
                    <option value="">— Не указано —</option>
                    <option value="1">1 место 🥇</option>
                    <option value="2">2 место 🥈</option>
                    <option value="3">3 место 🥉</option>
                    <option value="top8">Топ-8</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setAchievementForm({ ...achievementForm, is_team: !achievementForm.is_team })}
                  className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${achievementForm.is_team ? "bg-flux-red" : "bg-gray-700"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${achievementForm.is_team ? "translate-x-5" : ""}`} />
                </div>
                <span className="text-gray-400 text-sm font-oswald tracking-widest">КОМАНДНОЕ ДОСТИЖЕНИЕ</span>
              </label>

              {!achievementForm.is_team && (
                <div>
                  <label className={labelCls}>УЧАСТНИК</label>
                  <select className={inputCls} value={achievementForm.member_id}
                    onChange={(e) => setAchievementForm({ ...achievementForm, member_id: e.target.value })}>
                    <option value="">— Выберите участника —</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>{m.nickname ?? m.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-flux-border flex gap-3 justify-end">
              <button onClick={() => setShowAchievementForm(false)}
                className="px-5 py-2 border border-flux-border text-gray-400 hover:text-white font-oswald text-sm tracking-widest rounded transition-colors">
                ОТМЕНА
              </button>
              <button onClick={saveAchievement} disabled={loading || !achievementForm.title}
                className="px-6 py-2 bg-flux-red hover:bg-flux-red-bright disabled:opacity-50 text-white font-oswald text-sm tracking-widest rounded transition-colors">
                {loading ? "..." : "СОХРАНИТЬ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}