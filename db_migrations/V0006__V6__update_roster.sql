UPDATE t_p75921280_team_flux_website.members SET is_active = FALSE WHERE id > 0;

INSERT INTO t_p75921280_team_flux_website.members (name, role, nickname, bio, join_date, is_active, sort_order) VALUES
('Степан', 'Снайпер', 'sONK1', 'Снайпер команды, в некоторых моментах можно на него положится.', '2026-01-01', TRUE, 1),
('Максим', 'Rifler', 'Hop3ks', 'Хорошо стреляет, может не дать шансу на выживания.', '2026-01-01', TRUE, 2),
('Илья', 'IGL', 'Hyp3rs', 'Лидер команды с хорошим опытом в игре!', '2026-01-01', TRUE, 3),
('Михаил', 'Support', 'N3RPA', 'Может подсапортить товарищей.', '2026-01-01', TRUE, 4),
('Дмитрий', 'Rifler', 'SHYN4', 'Очень хорошо стреляет, не судите по обложке — это зверь.', '2026-01-01', TRUE, 5)