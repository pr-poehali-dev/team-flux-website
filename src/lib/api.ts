const MEMBERS_URL = "https://functions.poehali.dev/fe5284ae-b8a3-4643-b00c-87817cac96b0";
const ACHIEVEMENTS_URL = "https://functions.poehali.dev/312ed9b0-5506-4b65-8778-647de03bac46";

export interface Member {
  id: number;
  name: string;
  role: string;
  nickname: string | null;
  bio: string | null;
  avatar_url: string | null;
  social_vk: string | null;
  social_tg: string | null;
  join_date: string | null;
  is_active: boolean;
  sort_order: number;
  faceit_lvl: number | null;
  faceit_elo: number | null;
  kd_ratio: number | null;
  matches_played: number;
  matches_won: number;
  favorite_weapon: string | null;
  motto: string | null;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: number;
  member_id: number | null;
  member_name: string | null;
  member_nickname: string | null;
  title: string;
  description: string | null;
  date: string | null;
  place: string | null;
  tournament: string | null;
  is_team: boolean;
  created_at: string;
}

export const membersApi = {
  getAll: async (activeOnly = true): Promise<Member[]> => {
    const res = await fetch(`${MEMBERS_URL}?active=${activeOnly}`);
    return res.json();
  },
  getById: async (id: number): Promise<{ member: Member; achievements: Achievement[] }> => {
    const res = await fetch(`${MEMBERS_URL}/${id}`);
    return res.json();
  },
  create: async (data: Partial<Member>): Promise<Member> => {
    const res = await fetch(MEMBERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: number, data: Partial<Member>): Promise<Member> => {
    const res = await fetch(`${MEMBERS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deactivate: async (id: number): Promise<void> => {
    await fetch(`${MEMBERS_URL}/${id}`, { method: "DELETE" });
  },
};

export const achievementsApi = {
  getAll: async (params?: { member_id?: number; is_team?: boolean }): Promise<Achievement[]> => {
    const qs = new URLSearchParams();
    if (params?.member_id !== undefined) qs.set("member_id", String(params.member_id));
    if (params?.is_team !== undefined) qs.set("is_team", String(params.is_team));
    const res = await fetch(`${ACHIEVEMENTS_URL}?${qs.toString()}`);
    return res.json();
  },
  create: async (data: Partial<Achievement>): Promise<Achievement> => {
    const res = await fetch(ACHIEVEMENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: number, data: Partial<Achievement>): Promise<Achievement> => {
    const res = await fetch(`${ACHIEVEMENTS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};