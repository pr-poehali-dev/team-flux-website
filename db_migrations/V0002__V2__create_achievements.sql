CREATE TABLE t_p75921280_team_flux_website.achievements (
  id SERIAL PRIMARY KEY,
  member_id INT REFERENCES t_p75921280_team_flux_website.members(id),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE,
  place VARCHAR(50),
  tournament VARCHAR(200),
  is_team BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
)