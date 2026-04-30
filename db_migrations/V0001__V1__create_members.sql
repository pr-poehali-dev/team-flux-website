CREATE TABLE t_p75921280_team_flux_website.members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  nickname VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  social_vk VARCHAR(200),
  social_tg VARCHAR(200),
  join_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)